import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, LogOut, ArrowLeft } from 'lucide-react';
import { useProducts, useDeleteProduct } from '../../hooks/useProducts';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/formatPrice';
import { getCategoryLabel } from '../../utils/categories';
import Loading from '../../components/common/Loading';

export default function AdminProducts() {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useProducts({ limit: 100 });
  const deleteProduct = useDeleteProduct();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading) return <Loading size="lg" className="min-h-screen" />;
  if (!isAuthenticated) return null;

  const products = data?.products || [];

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteProduct.mutate(id);
    }
  };

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

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-warm-gray hover:text-charcoal">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-heading text-3xl font-bold text-charcoal">Products</h1>
          </div>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-sage-dark"
          >
            <Plus size={16} />
            Add Product
          </Link>
        </div>

        {isLoading ? (
          <Loading size="lg" className="py-20" />
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-heading text-2xl text-charcoal">No products yet</p>
            <Link
              to="/admin/products/new"
              className="mt-4 inline-block font-body text-sm text-sage-dark hover:underline"
            >
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand text-left">
                  <th className="px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-warm-gray">
                    Product
                  </th>
                  <th className="hidden px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-warm-gray md:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-warm-gray">
                    Price
                  </th>
                  <th className="hidden px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-warm-gray lg:table-cell">
                    Variants
                  </th>
                  <th className="hidden px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-warm-gray sm:table-cell">
                    Status
                  </th>
                  <th className="px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-warm-gray">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {products.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-sand/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <span className="font-body text-sm font-medium text-charcoal line-clamp-1">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      <span className="rounded-full bg-sage/10 px-3 py-1 font-body text-xs capitalize text-sage-dark">
                        {getCategoryLabel(product.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-charcoal">
                      {formatPrice(product.price)}
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell">
                      <div className="flex gap-2">
                        {(() => {
                          let sCount = 0;
                          let cCount = 0;
                          try { sCount = product.available_sizes ? JSON.parse(product.available_sizes).length : 0; } catch {}
                          try { cCount = product.available_colors ? JSON.parse(product.available_colors).length : 0; } catch {}
                          return (
                            <>
                              {sCount > 0 && (
                                <span className="rounded-full bg-sage/10 px-2.5 py-0.5 font-body text-xs text-sage-dark">
                                  {sCount} size{sCount !== 1 ? 's' : ''}
                                </span>
                              )}
                              {cCount > 0 && (
                                <span className="rounded-full bg-gold/10 px-2.5 py-0.5 font-body text-xs text-gold">
                                  {cCount} color{cCount !== 1 ? 's' : ''}
                                </span>
                              )}
                              {sCount === 0 && cCount === 0 && (
                                <span className="font-body text-xs text-warm-gray">—</span>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <span
                        className={`rounded-full px-3 py-1 font-body text-xs font-medium ${
                          product.in_stock
                            ? 'bg-sage/10 text-sage-dark'
                            : 'bg-terracotta/10 text-terracotta'
                        }`}
                      >
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-warm-gray transition-colors hover:bg-sage/10 hover:text-sage-dark"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-warm-gray transition-colors hover:bg-terracotta/10 hover:text-terracotta"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
