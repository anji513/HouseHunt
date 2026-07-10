import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="relative inline-block">
          <p className="text-[120px] sm:text-[160px] font-bold font-display leading-none bg-gradient-to-br from-primary-500 to-primary-800 bg-clip-text text-transparent">404</p>
          <Compass className="absolute -top-2 -right-2 w-10 h-10 text-accent-500 animate-float" />
        </div>
        <h1 className="text-2xl font-bold mt-2">Page not found</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <Link to="/" className="btn-primary"><Home className="w-4 h-4" /> Go home</Link>
          <button onClick={() => history.back()} className="btn-outline"><ArrowLeft className="w-4 h-4" /> Go back</button>
        </div>
      </div>
    </div>
  );
}
