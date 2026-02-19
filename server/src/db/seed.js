/**
 * Seed script for BajraGuru e-commerce database.
 * Run with: node src/db/seed.js
 */

require('dotenv').config();

const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();
const { initializeDatabase, getDb, closeDatabase } = require('./index');

const products = [
  {
    name: 'Tibetan Singing Bowl',
    description:
      'Hand-hammered Tibetan singing bowl crafted by skilled artisans in Nepal. Produces rich, resonant tones perfect for meditation, sound healing, and chakra balancing. Comes with a wooden mallet and silk cushion.',
    price: 89.99,
    category: 'home-lifestyle',
    featured: 1,
    in_stock: 1,
    popularity_score: 95,
    available_sizes: JSON.stringify(['Small (4")', 'Medium (6")', 'Large (8")', 'Extra Large (10")']),
    available_colors: JSON.stringify([
      { name: 'Antique Bronze', hex: '#665D1E' },
      { name: 'Golden', hex: '#C9A86C' },
      { name: 'Dark Bronze', hex: '#3B2F2F' },
    ]),
    images: [
      'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800',
      'https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=800',
      'https://images.unsplash.com/photo-1591710668691-4e55ee771638?w=800',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    ],
  },
  {
    name: 'Nag Champa Incense Sticks',
    description:
      'Premium hand-rolled Nag Champa incense sticks made with natural sandalwood and frangipani. Each stick burns for approximately 45 minutes, filling your space with a calming, sacred aroma. Pack of 100 sticks.',
    price: 12.99,
    category: 'incense',
    featured: 1,
    in_stock: 1,
    popularity_score: 88,
    images: [
      'https://images.unsplash.com/photo-1602519164014-4e1e10b2cfb4?w=800',
      'https://images.unsplash.com/photo-1600956054875-205b8cfde109?w=800',
      'https://images.unsplash.com/photo-1598191947323-581fe0ff73f5?w=800',
    ],
  },
  {
    name: 'Meditating Buddha Statue',
    description:
      'Beautifully detailed Buddha statue in meditation pose (Dhyana Mudra). Cast in cold-cast bronze resin with an antique finish. Stands 12 inches tall. A serene addition to any meditation space or altar.',
    price: 149.99,
    category: 'home-lifestyle',
    featured: 1,
    in_stock: 1,
    popularity_score: 92,
    available_sizes: JSON.stringify(['Small (6")', 'Medium (12")', 'Large (18")']),
    available_colors: JSON.stringify([
      { name: 'Antique Gold', hex: '#B8860B' },
      { name: 'White Marble', hex: '#F5F5F0' },
      { name: 'Dark Bronze', hex: '#3B2F2F' },
      { name: 'Copper', hex: '#B87333' },
    ]),
    images: [
      'https://images.unsplash.com/photo-1609619385002-f40f1df827b8?w=800',
      'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=800',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
    ],
  },
  {
    name: 'Tibetan Prayer Flags',
    description:
      'Authentic Tibetan Lung Ta prayer flags featuring traditional woodblock prints of the Wind Horse and sacred mantras. Set of 25 flags on a 20-foot string. Colors represent the five elements. Handmade in Nepal.',
    price: 18.99,
    category: 'prayer-flags',
    featured: 0,
    in_stock: 1,
    popularity_score: 78,
    available_sizes: JSON.stringify(['Small (10ft)', 'Medium (20ft)', 'Large (30ft)']),
    images: [
      'https://images.unsplash.com/photo-1582126892906-5ba118eaf46e?w=800',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800',
      'https://images.unsplash.com/photo-1585997067879-2e60e4e66c48?w=800',
    ],
  },
  {
    name: 'Zafu Meditation Cushion',
    description:
      'Traditional round zafu meditation cushion filled with organic buckwheat hulls. Covered in durable, removable cotton canvas in deep saffron. Provides excellent support for cross-legged sitting postures.',
    price: 54.99,
    category: 'home-lifestyle',
    featured: 1,
    in_stock: 1,
    popularity_score: 85,
    available_colors: JSON.stringify([
      { name: 'Saffron', hex: '#F4C430' },
      { name: 'Maroon', hex: '#800000' },
      { name: 'Sage Green', hex: '#9DB4A0' },
      { name: 'Charcoal', hex: '#2D2D2D' },
    ]),
    images: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800',
    ],
  },
  {
    name: 'Brass Butter Lamp',
    description:
      'Traditional Tibetan brass butter lamp (dipa) used for Buddhist altar offerings. Handcrafted with intricate auspicious symbol engravings. Stands 4 inches tall. Can be used with butter or oil.',
    price: 34.99,
    category: 'butter-lamp-pooja',
    featured: 0,
    in_stock: 1,
    popularity_score: 70,
    images: [
      'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800',
    ],
  },
  {
    name: 'White Sage Smudge Bundle',
    description:
      'Ethically harvested California White Sage smudge stick. Used for centuries in purification and cleansing rituals. Each bundle is approximately 8-9 inches long and tightly wrapped with cotton string. Pack of 3.',
    price: 16.99,
    category: 'incense',
    featured: 0,
    in_stock: 1,
    popularity_score: 82,
    images: [
      'https://images.unsplash.com/photo-1595856898078-86c25741cf14?w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    ],
  },
  {
    name: 'Rudraksha Mala Beads',
    description:
      'Authentic 108-bead Rudraksha mala for japa meditation and mantra recitation. Each 8mm bead is naturally formed and hand-strung on durable silk thread with a traditional guru bead and tassel.',
    price: 39.99,
    category: 'keychains-bracelets',
    featured: 1,
    in_stock: 1,
    popularity_score: 90,
    images: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
    ],
  },
];

function seed() {
  console.log('Initializing database...');
  initializeDatabase();

  const db = getDb();

  console.log('Clearing existing data...');
  db.prepare('DELETE FROM product_images').run();
  db.prepare('DELETE FROM products').run();

  console.log('Seeding products...');
  const insertProduct = db.prepare(`
    INSERT INTO products (id, name, description, price, category, featured, in_stock, popularity_score, available_sizes, available_colors)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertImage = db.prepare(`
    INSERT INTO product_images (id, product_id, image_url, display_order)
    VALUES (?, ?, ?, ?)
  `);

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      const productId = uuidv4();

      insertProduct.run(
        productId,
        item.name,
        item.description,
        item.price,
        item.category,
        item.featured,
        item.in_stock,
        item.popularity_score,
        item.available_sizes || null,
        item.available_colors || null
      );

      // Add images
      for (let i = 0; i < item.images.length; i++) {
        const imageId = uuidv4();
        insertImage.run(imageId, productId, item.images[i], i);
      }

      console.log(`  Created: ${item.name} (${productId}) — ${item.images.length} image(s)`);
    }
  });

  insertMany(products);

  const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
  console.log(`\nSeeding complete! ${count.count} products created.`);

  closeDatabase();
}

seed();
