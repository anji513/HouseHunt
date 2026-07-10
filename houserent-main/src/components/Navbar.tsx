import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home, Menu, X, Sun, Moon, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  const dashLink = user?.role === 'admin' ? '/admin' : user?.role === 'owner' ? '/owner' : '/renter';

  const links = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/search', label: 'Search' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-soft' : 'bg-transparent'}`}>
      <nav className="section h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white shadow-soft">
            <Home className="w-5 h-5" />
          </span>
          <span>House<span className="text-primary-600">Hunt</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition link-underline ${
                  isActive ? 'text-primary-600' : 'text-slate-600 dark:text-slate-300 hover:text-primary-600'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            className="w-9 h-9 grid place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to={dashLink} className="btn-outline !py-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-ghost !py-2" aria-label="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="btn-ghost !py-2">Login</Link>
              <Link to="/register" className="btn-primary !py-2"><User className="w-4 h-4" /> Sign up</Link>
            </div>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-9 h-9 grid place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass-strong border-t border-slate-200/60 dark:border-slate-800 animate-fade-in-fast">
          <div className="section py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="h-px bg-slate-200 dark:bg-slate-800 my-1" />
            {isAuthenticated ? (
              <>
                <Link to={dashLink} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Dashboard</Link>
                <button onClick={() => { handleLogout(); setOpen(false); }} className="px-3 py-2.5 rounded-lg text-sm font-medium text-left text-error-600 hover:bg-error-50 dark:hover:bg-error-950/30">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-primary-600">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
