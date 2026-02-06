import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, LogOut } from 'lucide-react';
import { useProduct, useCreateProduct, useUpdateProduct } from '../../hooks/useProducts';
import { productApi } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';

const categories = [
  { value: 'meditation', label: 'Meditation' },
  { value: 'incense', label: 'Incense' },
  { value: 'statues', label: 'Statues' },
  { value: 'decor', label: 'Decor' },
  { value: 'ritual', label: 'Ritual' },
  { value: 'edibles', label: 'Edibles' },
];

export default function AdminProductForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading, logout } = useAuth();

  const { data: productData, isLoading: productLoading } = useProduct(id);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'meditation',
    featured: false,
    in_stock: true,
    popularity_score: 0,
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isEditing && productData?.product) {
      const p = productData.product;
      setForm({
        name: p.name,
        description: p.description,
        price: String(p.price),
        category: p.category,
        featured: Boolean(p.featured),
        in_stock: Boolean(p.in_stock),
        popularity_score: p.popularity_score || 0,
      });
      setExistingImages(p.images || []);
    }
  }, [isEditing, productData]);

  if (authLoading || (isEditing && productLoading)) {
    return <Loading size="lg" className="min-h-screen" />;
  }
  if (!isAuthenticated) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (imageId) => {
    try {
      await productApi.deleteImage(id, imageId);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch {
      setError('Failed to delete image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const productData = {
      ...form,
      price: parseFloat(form.price),
      popularity_score: parseInt(form.popularity_score, 10) || 0,
    };

    try {
      let productId = id;

      if (isEditing) {
        await updateProduct.mutateAsync({ id, data: productData });
      } else {
        const result = await createProduct.mutateAsync(productData);
        productId = result.product.id;
      }

      // Upload new images if any
      if (images.length > 0) {
        setUploading(true);
        const formData = new FormData();
        images.forEach((file) => formData.append('images', file));
        await productApi.uploadImages(productId, formData);
        setUploading(false);
      }

      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
      setUploading(false);
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending || uploading;

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Admin Header */}
      <header className="border-b border-sand bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-heading text-xl font-semibold text-charcoal">
              BajraGuru
            </Link>
            <span className="rounded-full bg-sage/10 px-3 py-1 font-body text-xs font-medium text-sage-dark">
              Admin
            </span>
          </div>
          <button
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="flex items-center gap-2 font-body text-sm text-warm-gray transition-colors hover:text-terracotta"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/admin/products" className="text-warm-gray hover:text-charcoal">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            {isEditing ? 'Edit Product' : 'New Product'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="mb-5 font-heading text-lg font-semibold text-charcoal">
              Product Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Popularity Score
                  </label>
                  <input
                    type="number"
                    name="popularity_score"
                    min="0"
                    max="100"
                    value={form.popularity_score}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                  />
                </div>

                <label className="flex items-center gap-3 self-end rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-sage-light text-sage accent-sage"
                  />
                  <span className="font-body text-sm text-charcoal">Featured</span>
                </label>

                <label className="flex items-center gap-3 self-end rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3">
                  <input
                    type="checkbox"
                    name="in_stock"
                    checked={form.in_stock}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-sage-light text-sage accent-sage"
                  />
                  <span className="font-body text-sm text-charcoal">In Stock</span>
                </label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="mb-5 font-heading text-lg font-semibold text-charcoal">
              Product Images
            </h3>

            {/* Existing images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 font-body text-xs font-medium text-warm-gray">Current Images</p>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((img) => (
                    <div key={img.id} className="group relative h-24 w-24 overflow-hidden rounded-xl bg-sand">
                      <img src={img.image_url} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img.id)}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New image previews */}
            {images.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 font-body text-xs font-medium text-warm-gray">New Images</p>
                <div className="flex flex-wrap gap-3">
                  {images.map((file, i) => (
                    <div key={i} className="group relative h-24 w-24 overflow-hidden rounded-xl bg-sand">
                      <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewImage(i)}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload area */}
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sage-light/50 bg-offwhite px-6 py-8 transition-colors hover:border-sage">
              <Upload size={28} className="text-sage-light" />
              <p className="mt-2 font-body text-sm text-warm-gray">
                Click to upload images
              </p>
              <p className="mt-1 font-body text-xs text-warm-gray/60">
                JPG, PNG, WebP (max 5MB each, up to 5 files)
              </p>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {error && (
            <p className="rounded-lg bg-terracotta/10 p-4 font-body text-sm text-terracotta">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending
                ? uploading
                  ? 'Uploading images...'
                  : 'Saving...'
                : isEditing
                  ? 'Update Product'
                  : 'Create Product'}
            </Button>
            <Link
              to="/admin/products"
              className="font-body text-sm text-warm-gray hover:text-charcoal"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
