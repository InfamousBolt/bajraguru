import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/Skeleton';
import ErrorMessage from '../components/common/ErrorMessage';

const categories = [
  { value: '', label: 'All Products' },
  { value: 'meditation', label: 'Meditation' },
  { value: 'incense', label: 'Incense' },
  { value: 'statues', label: 'Statues' },
  { value: 'decor', label: 'Decor' },
  { value: 'ritual', label: 'Ritual' },
  { value: 'edibles', label: 'Edibles' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const params = useMemo(() => ({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'newest',
    page: searchParams.get('page') || '1',
    limit: '12',
  }), [searchParams]);

  const { data, isLoading, isError, refetch } = useProducts(params);
  const products = data?.products || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    if (key !== 'page') next.set('page', '1');
    setSearchParams(next);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateParam('search', searchInput.trim());
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const hasActiveFilters = params.category || params.search;

  return (
    <section className="bg-offwhite py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
            Shop
          </h1>
          <p className="mt-2 font-body text-warm-gray">
            {pagination.total} product{pagination.total !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Search + Controls Bar */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form onSubmit={handleSearch} className="relative flex-1 md:max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-full border border-sage-light/50 bg-white py-3 pl-11 pr-4 font-body text-sm text-charcoal placeholder-warm-gray/60 outline-none transition-shadow focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </form>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full border border-sage-light/50 bg-white px-5 py-3 font-body text-sm text-charcoal transition-colors hover:border-sage md:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <select
              value={params.sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="rounded-full border border-sage-light/50 bg-white px-5 py-3 font-body text-sm text-charcoal outline-none transition-shadow focus:border-sage focus:ring-2 focus:ring-sage/20"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} w-full shrink-0 md:block md:w-56`}>
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-charcoal">Categories</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="font-body text-xs text-sage-dark hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <ul className="mt-4 space-y-1">
                {categories.map((cat) => (
                  <li key={cat.value}>
                    <button
                      onClick={() => updateParam('category', cat.value)}
                      className={`w-full rounded-lg px-3 py-2 text-left font-body text-sm transition-colors ${
                        params.category === cat.value
                          ? 'bg-sage/10 font-medium text-sage-dark'
                          : 'text-warm-gray hover:bg-sand'
                      }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap gap-2">
                {params.category && (
                  <span className="flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1.5 font-body text-xs font-medium text-sage-dark">
                    {categories.find((c) => c.value === params.category)?.label}
                    <button onClick={() => updateParam('category', '')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {params.search && (
                  <span className="flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1.5 font-body text-xs font-medium text-sage-dark">
                    &ldquo;{params.search}&rdquo;
                    <button onClick={() => { setSearchInput(''); updateParam('search', ''); }}>
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {isLoading ? (
              <ProductGridSkeleton count={6} columns="sm:grid-cols-2 lg:grid-cols-3" />
            ) : isError ? (
              <ErrorMessage title="Couldn't load products" message="Please check your connection and try again." onRetry={refetch} />
            ) : products.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-heading text-2xl text-charcoal">No products found</p>
                <p className="mt-2 font-body text-sm text-warm-gray">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 font-body text-sm font-medium text-sage-dark hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{ ...product, images: product.image_url ? [{ url: product.image_url }] : [] }}
                  />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => updateParam('page', String(pagination.page - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-light/50 text-charcoal transition-colors hover:bg-sage hover:text-white disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => updateParam('page', String(page))}
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-body text-sm transition-colors ${
                      page === pagination.page
                        ? 'bg-sage text-white'
                        : 'border border-sage-light/50 text-charcoal hover:bg-sage/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => updateParam('page', String(pagination.page + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-light/50 text-charcoal transition-colors hover:bg-sage hover:text-white disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
