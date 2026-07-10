import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit3 } from 'lucide-react';
import PropertyForm from './PropertyForm';
import { propertyService } from '../../services/propertyService';
import { Skeleton } from '../../components/Loader';
import { ErrorState } from '../../components/EmptyState';

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await propertyService.get(id!);
        setProperty(res?.property || res?.data || res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="section py-10 max-w-4xl space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-96 w-full rounded-3xl" /></div>;
  if (error || !property) return <div className="section py-20"><ErrorState message={error || 'Not found'} onRetry={() => navigate(-1)} /></div>;

  return (
    <div className="section py-10 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Edit3 className="w-7 h-7 text-primary-600" /> Edit property</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Update your listing details.</p>
      </div>
      <PropertyForm initial={property} id={id} />
    </div>
  );
}
