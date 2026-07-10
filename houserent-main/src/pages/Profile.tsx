import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Phone, Save, ShieldCheck } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';

export default function Profile() {
  const { user, setAuth, token } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [saving, setSaving] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Optimistic local update (backend profile update endpoint not specified)
    setTimeout(() => {
      setAuth({ user: { ...user!, ...form }, token: token! });
      toast('Profile updated', 'success');
      setSaving(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your personal information.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div>
          <ProfileCard />
        </div>
        <div className="lg:col-span-2">
          <form onSubmit={save} className="card p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2"><User className="w-5 h-5 text-primary-500" /> Personal information</h3>
            <div>
              <label className="label">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input !pl-9" />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input !pl-9" />
              </div>
            </div>
            <div>
              <label className="label">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input !pl-9" placeholder="+1 555 000 0000" />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button type="submit" disabled={saving} className="btn-primary"><Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save changes'}</button>
              {user?.role === 'owner' && user?.isApproved && (
                <span className="chip bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300"><ShieldCheck className="w-3.5 h-3.5" /> Verified owner</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
