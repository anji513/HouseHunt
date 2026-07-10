import { Link } from 'react-router-dom';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const cols = [
    { title: 'Explore', links: [['All Properties', '/properties'], ['Search', '/search'], ['List a Property', '/owner/properties/new']] },
    { title: 'Company', links: [['About Us', '/'], ['How it works', '/'], ['Contact', '/']] },
    { title: 'Account', links: [['Login', '/login'], ['Register', '/register'], ['Forgot Password', '/forgot-password']] },
  ];
  return (
    <footer className="mt-20 border-t border-slate-200/70 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50">
      <div className="section py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white shadow-soft">
                <Home className="w-5 h-5" />
              </span>
              <span>House<span className="text-primary-600">Hunt</span></span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-sm">
              The premium house rental management platform. Discover, list, and manage rental homes effortlessly.
            </p>
            <div className="flex gap-2 mt-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 hover:text-white transition" aria-label="social">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-semibold text-sm mb-3">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} HouseHunt. All rights reserved.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> hello@househunt.app
          </p>
        </div>
      </div>
    </footer>
  );
}
