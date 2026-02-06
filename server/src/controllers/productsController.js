const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();
const { getDb } = require('../db');
const { processImage, deleteImageFiles, deleteProductImageDir } = require('../services/imageService');

/**
 * GET /api/products
 * List products with filtering, sorting, and pagination.
 */
function getAll(req, res) {
  try {
    const db = getDb();
    const {
      category,
      minPrice,
      maxPrice,
      search,
      sort,
      featured,
      page = 1,
      limit = 20,
    } = req.query;

    const conditions = [];
    const params = [];

    if (category) {
      conditions.push('p.category = ?');
      params.push(category);
    }

    if (minPrice) {
      conditions.push('p.price >= ?');
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      conditions.push('p.price <= ?');
      params.push(parseFloat(maxPrice));
    }

    if (search) {
      conditions.push('(p.name LIKE ? OR p.description LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (featured !== undefined) {
      conditions.push('p.featured = ?');
      params.push(featured === 'true' || featured === '1' ? 1 : 0);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    let orderClause;
    switch (sort) {
      case 'price_asc':
        orderClause = 'ORDER BY p.price ASC';
        break;
      case 'price_desc':
        orderClause = 'ORDER BY p.price DESC';
        break;
      case 'popularity':
        orderClause = 'ORDER BY p.popularity_score DESC';
        break;
      case 'newest':
        orderClause = 'ORDER BY p.created_at DESC';
        break;
      default:
        orderClause = 'ORDER BY p.created_at DESC';
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM products p ${whereClause}`;
    const { total } = db.prepare(countQuery).get(...params);

    // Get products with their first image
    const query = `
      SELECT p.*,
        (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id ORDER BY pi.display_order ASC LIMIT 1) as image_url
      FROM products p
      ${whereClause}
      ${orderClause}
      LIMIT ? OFFSET ?
    `;

    const products = db.prepare(query).all(...params, limitNum, offset);

    return res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * GET /api/products/:id
 * Get a single product with all its images.
 */
function getById(req, res) {
  try {
    const db = getDb();
    const { id } = req.params;

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const images = db
      .prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order ASC')
      .all(id);

    return res.json({ product: { ...product, images } });
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * POST /api/products
 * Create a new product (admin only).
 */
function create(req, res) {
  try {
    const db = getDb();
    const { name, description, price, category, featured, in_stock, popularity_score, available_sizes, available_colors } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({ error: 'Name, description, price, and category are required.' });
    }

    const validCategories = ['decor', 'meditation', 'incense', 'statues', 'ritual', 'edibles'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
      });
    }

    const id = uuidv4();

    const stmt = db.prepare(`
      INSERT INTO products (id, name, description, price, category, featured, in_stock, popularity_score, available_sizes, available_colors)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      name,
      description,
      parseFloat(price),
      category,
      featured ? 1 : 0,
      in_stock !== undefined ? (in_stock ? 1 : 0) : 1,
      parseInt(popularity_score, 10) || 0,
      available_sizes || null,
      available_colors || null
    );

    const created = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

    return res.status(201).json({ product: created });
  } catch (err) {
    console.error('Error creating product:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * PUT /api/products/:id
 * Update an existing product (admin only).
 */
function update(req, res) {
  try {
    const db = getDb();
    const { id } = req.params;
    const { name, description, price, category, featured, in_stock, popularity_score, available_sizes, available_colors } = req.body;

    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    if (category) {
      const validCategories = ['decor', 'meditation', 'incense', 'statues', 'ritual', 'edibles'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          error: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
        });
      }
    }

    const stmt = db.prepare(`
      UPDATE products SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        category = COALESCE(?, category),
        featured = COALESCE(?, featured),
        in_stock = COALESCE(?, in_stock),
        popularity_score = COALESCE(?, popularity_score),
        available_sizes = COALESCE(?, available_sizes),
        available_colors = COALESCE(?, available_colors),
        updated_at = datetime('now')
      WHERE id = ?
    `);

    stmt.run(
      name || null,
      description || null,
      price !== undefined ? parseFloat(price) : null,
      category || null,
      featured !== undefined ? (featured ? 1 : 0) : null,
      in_stock !== undefined ? (in_stock ? 1 : 0) : null,
      popularity_score !== undefined ? parseInt(popularity_score, 10) : null,
      available_sizes !== undefined ? available_sizes : null,
      available_colors !== undefined ? available_colors : null,
      id
    );

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    const images = db
      .prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order ASC')
      .all(id);

    return res.json({ product: { ...updated, images } });
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * DELETE /api/products/:id
 * Delete a product and all associated images (admin only).
 */
function remove(req, res) {
  try {
    const db = getDb();
    const { id } = req.params;

    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Delete image files from filesystem
    deleteProductImageDir(id);

    // Delete from database (cascade will handle product_images)
    db.prepare('DELETE FROM product_images WHERE product_id = ?').run(id);
    db.prepare('DELETE FROM products WHERE id = ?').run(id);

    return res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * POST /api/products/:id/images
 * Upload and process images for a product (admin only).
 */
async function uploadImages(req, res) {
  try {
    const db = getDb();
    const { id } = req.params;

    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    // Get current max display_order for this product
    const maxOrder = db
      .prepare('SELECT MAX(display_order) as max_order FROM product_images WHERE product_id = ?')
      .get(id);
    let displayOrder = (maxOrder && maxOrder.max_order !== null) ? maxOrder.max_order + 1 : 0;

    const savedImages = [];

    for (const file of req.files) {
      const result = await processImage(file.buffer, id);

      const stmt = db.prepare(`
        INSERT INTO product_images (id, product_id, image_url, display_order)
        VALUES (?, ?, ?, ?)
      `);

      stmt.run(result.id, id, result.original, displayOrder);
      displayOrder++;

      savedImages.push({
        id: result.id,
        product_id: id,
        image_url: result.original,
        thumbnail_url: result.thumbnail,
        display_order: displayOrder - 1,
      });
    }

    return res.status(201).json({ images: savedImages });
  } catch (err) {
    console.error('Error uploading images:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * DELETE /api/products/:id/images/:imageId
 * Delete a specific image from a product (admin only).
 */
function deleteImage(req, res) {
  try {
    const db = getDb();
    const { id, imageId } = req.params;

    const image = db
      .prepare('SELECT * FROM product_images WHERE id = ? AND product_id = ?')
      .get(imageId, id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found.' });
    }

    // Delete files from filesystem
    deleteImageFiles(image.image_url);

    // Delete from database
    db.prepare('DELETE FROM product_images WHERE id = ?').run(imageId);

    return res.json({ message: 'Image deleted successfully.' });
  } catch (err) {
    console.error('Error deleting image:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  uploadImages,
  deleteImage,
};
