import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, Home, Building2, UserCircle } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Register() {
  const { setAuth } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'renter' as 'renter' | 'owner' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.register(form);
      setAuth({ user: res.user, token: res.token });
      toast('Account created successfully!', 'success');
      navigate(form.role === 'owner' ? '/owner' : '/renter', { replace: true });
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden mb-6">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white"><Home className="w-5 h-5" /></span>
              HouseHunt
            </Link>
          </div>
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Join HouseHunt as a renter or owner in seconds.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {([['renter', UserCircle], ['owner', Building2]] as const).map(([val, Icon]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm({ ...form, role: val })}
                    className={`flex items-center gap-2 justify-center px-4 py-3 rounded-xl border-2 text-sm font-medium transition ${
                      form.role === val
                        ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {val === 'renter' ? 'Renter' : 'Owner'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input !pl-9" placeholder="Jane Doe" />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input !pl-9" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="label">Phone (optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input !pl-9" placeholder="+1 555 000 0000" />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={show ? 'text' : 'password'} required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input !pl-9 !pr-10" placeholder="At least 6 characters" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-6">
            Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block relative bg-gradient-to-br from-accent-500 via-accent-600 to-accent-800 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-hero-grid bg-[size:24px_24px] opacity-20" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl ml-auto">
            <span className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur grid place-items-center"><Home className="w-5 h-5" /></span>
            HouseHunt
          </Link>
          <div>
            <h1 className="text-4xl font-bold font-display leading-tight">List. Book. Move in.</h1>
            <p className="mt-4 text-white/80 max-w-md">Join thousands of renters and owners managing their homes on HouseHunt — the premium rental platform.</p>
          </div>
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} HouseHunt</p>
        </div>
      </div>
    </div>
  );
}
