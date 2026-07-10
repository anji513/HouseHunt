import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Home } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const { setAuth } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login(form);
      setAuth({ user: res.user, token: res.token });
      toast(`Welcome back, ${res.user.name}!`, 'success');
      const dest = location.state?.from?.pathname || (res.user.role === 'admin' ? '/admin' : res.user.role === 'owner' ? '/owner' : '/renter');
      navigate(dest, { replace: true });
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid bg-[size:24px_24px] opacity-20" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur grid place-items-center"><Home className="w-5 h-5" /></span>
            HouseHunt
          </Link>
          <div>
            <h1 className="text-4xl font-bold font-display leading-tight">Welcome back to your next home.</h1>
            <p className="mt-4 text-white/80 max-w-md">Sign in to manage your listings, track bookings, and discover premium rentals tailored to you.</p>
          </div>
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} HouseHunt</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden mb-6">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white"><Home className="w-5 h-5" /></span>
              HouseHunt
            </Link>
          </div>
          <h2 className="text-2xl font-bold">Sign in</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enter your credentials to access your account.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input !pl-9" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={show ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input !pl-9 !pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-primary-600 hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-6">
            Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
