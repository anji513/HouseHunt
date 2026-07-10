import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import PropertyCard, { Property } from '../../components/PropertyCard';
import { CardSkeleton } from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';
import AdvancedFilters, { Filters } from '../../components/AdvancedFilters';
import Pagination from '../../components/Pagination';
import { propertyService } from '../../services/propertyService';

export default function SearchResults() {
  const [params] = useSearchParams();
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<Filters>({});

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await propertyService.list({
        page,
        limit: 12,
        search: params.get('search') || undefined,
        city: params.get('city') || filters.city,
        type: params.get('type') || filters.type,
        minRent: filters.minRent,
        maxRent: filters.maxRent,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
      });
      const list = res?.properties || res?.data || res || [];
      setItems(Array.isArray(list) ? list : []);
      setTotalPages(res?.totalPages || res?.pages || 1);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { setPage(1); load(); }, [params, filters]);

  const query = params.get('search') || params.get('city') || params.get('type') || 'all homes';

  return (
    <div className="section py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Search className="w-7 h-7 text-primary-600" /> Search Results</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Showing results for "<span className="font-medium text-slate-700 dark:text-slate-200">{query}</span>"</p>
      </div>

      <div className="flex justify-end mb-6">
        <AdvancedFilters initial={filters} onChange={setFilters} />
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={Search} title="No matches found" description="Try broadening your search or removing some filters." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((p) => <PropertyCard key={p._id} property={p} />)}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
