import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, MessageSquare, Star, LogOut, Plus, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { productApi, feedbackApi, contactApi } from '../../services/api';
import Loading from '../../components/common/Loading';
import { StatCardSkeleton } from '../../components/common/Skeleton';

export default function AdminDashboard() {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productApi.getAll({ limit: 100 }),
    enabled: isAuthenticated,
  });

  const { data: feedbackData, isLoading: feedbackLoading } = useQuery({
    queryKey: ['admin-feedback'],
    queryFn: () => feedbackApi.getAll(),
    enabled: isAuthenticated,
  });

  const { data: contactData, isLoading: contactLoading } = useQuery({
    queryKey: ['admin-contact'],
    queryFn: () => contactApi.getAll(),
    enabled: isAuthenticated,
  });

  const deleteFeedbackMutation = useMutation({
    mutationFn: (id) => feedbackApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-feedback'] });
    },
  });

  const handleDeleteFeedback = (id, name) => {
    if (window.confirm(`Delete review from "${name || 'Anonymous'}"?`)) {
      deleteFeedbackMutation.mutate(id);
    }
  };

  if (authLoading) return <Loading size="lg" className="min-h-screen" />;
  if (!isAuthenticated) return null;

  const stats = [
    {
      label: 'Products',
      value: productsData?.pagination?.total ?? '...',
      icon: Package,
      link: '/admin/products',
      loading: productsLoading,
    },
    {
      label: 'Reviews',
      value: feedbackData?.feedback?.length ?? '...',
      icon: Star,
      link: '#',
      loading: feedbackLoading,
    },
    {
      label: 'Messages',
      value: contactData?.messages?.length ?? '...',
      icon: MessageSquare,
      link: '#',
      loading: contactLoading,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Admin Header */}
      <header className="border-b border-sand bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/bajraguru_logo.png" alt="BajraGuru" className="h-8 w-8 rounded-full" />
              <span className="font-heading text-xl font-semibold text-charcoal">BajraGuru</span>
            </Link>
            <span className="rounded-full bg-sage/10 px-3 py-1 font-body text-xs font-medium text-sage-dark">
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-body text-sm text-warm-gray transition-colors hover:text-terracotta"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-charcoal">Dashboard</h1>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-sage-dark"
          >
            <Plus size={16} />
            New Product
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {stats.map((stat) =>
            stat.loading ? (
              <StatCardSkeleton key={stat.label} />
            ) : (
              <Link
                key={stat.label}
                to={stat.link}
                className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
                    <stat.icon size={20} className="text-sage-dark" strokeWidth={1.5} />
                  </div>
                  <p className="font-heading text-3xl font-bold text-charcoal">
                    {stat.value}
                  </p>
                </div>
                <p className="mt-3 font-body text-sm text-warm-gray">{stat.label}</p>
              </Link>
            )
          )}
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-charcoal">Reviews</h2>
          <div className="mt-4 rounded-2xl bg-white shadow-sm">
            {feedbackLoading ? (
              <Loading className="py-10" />
            ) : (feedbackData?.feedback || []).length === 0 ? (
              <p className="px-6 py-10 text-center font-body text-sm text-warm-gray">
                No reviews yet.
              </p>
            ) : (
              <div className="divide-y divide-sand">
                {(feedbackData?.feedback || []).map((review) => (
                  <div key={review.id} className="flex items-start justify-between px-6 py-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-body text-sm font-semibold text-charcoal">
                          {review.name || 'Anonymous'}
                        </p>
                        {review.rating && (
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < review.rating ? 'fill-gold text-gold' : 'text-sand'}
                              />
                            ))}
                          </div>
                        )}
                        <p className="font-body text-xs text-warm-gray">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="mt-1 font-body text-sm text-warm-gray line-clamp-2">
                        {review.message}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteFeedback(review.id, review.name)}
                      disabled={deleteFeedbackMutation.isPending}
                      className="ml-4 flex-shrink-0 rounded-lg p-2 text-warm-gray transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                      title="Delete review"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-charcoal">Recent Messages</h2>
          <div className="mt-4 rounded-2xl bg-white shadow-sm">
            {contactLoading ? (
              <Loading className="py-10" />
            ) : (contactData?.messages || []).length === 0 ? (
              <p className="px-6 py-10 text-center font-body text-sm text-warm-gray">
                No messages yet.
              </p>
            ) : (
              <div className="divide-y divide-sand">
                {(contactData?.messages || []).slice(0, 5).map((msg) => (
                  <div key={msg.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="font-body text-sm font-semibold text-charcoal">{msg.name}</p>
                      <p className="font-body text-xs text-warm-gray">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-0.5 font-body text-xs text-sage-dark">{msg.email}</p>
                    {msg.subject && (
                      <p className="mt-1 font-body text-sm font-medium text-charcoal">{msg.subject}</p>
                    )}
                    <p className="mt-1 font-body text-sm text-warm-gray line-clamp-2">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
