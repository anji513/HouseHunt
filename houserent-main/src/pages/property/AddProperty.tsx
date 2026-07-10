import { PlusCircle } from 'lucide-react';
import PropertyForm from './PropertyForm';

export default function AddProperty() {
  return (
    <div className="section py-10 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2"><PlusCircle className="w-7 h-7 text-primary-600" /> List a new property</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Fill in the details to publish your rental listing.</p>
      </div>
      <PropertyForm />
    </div>
  );
}
