import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(password);
      navigate('/admin');
    } catch {
      setError('Invalid password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/10">
            <Lock size={28} className="text-sage-dark" strokeWidth={1.5} />
          </div>
          <h1 className="mt-5 font-heading text-3xl font-bold text-charcoal">Admin Access</h1>
          <p className="mt-2 font-body text-sm text-warm-gray">
            Enter the admin password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
              Password
            </label>
            <input
              type="password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-terracotta/10 p-3 font-body text-sm text-terracotta">
              {error}
            </p>
          )}

          <div className="mt-5">
            <Button type="submit" size="lg" disabled={loading} className="w-full">
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
