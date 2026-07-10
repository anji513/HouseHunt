import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Home } from 'lucide-react';
import { authService } from '../../services/authService';
import { useToast } from '../../context/ToastContext';

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword({ email });
      setSent(true);
      toast('Reset link sent if the email exists.', 'success');
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-950 dark:to-primary-950">
      <div className="w-full max-w-md animate-slide-up">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl justify-center mb-6">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white"><Home className="w-5 h-5" /></span>
          HouseHunt
        </Link>
        <div className="card p-8">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-success-50 dark:bg-success-950/40 grid place-items-center text-success-500 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold">Check your inbox</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">We've sent a password reset link to <span className="font-medium text-slate-700 dark:text-slate-200">{email}</span>.</p>
              <Link to="/login" className="btn-primary w-full !py-3 inline-flex"><ArrowLeft className="w-4 h-4" /> Back to login</Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Forgot password?</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <label className="label">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input !pl-9" placeholder="you@example.com" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>
              </form>
              <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 transition">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
