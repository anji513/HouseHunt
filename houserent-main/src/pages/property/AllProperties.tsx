import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import PropertyCard, { Property } from '../../components/PropertyCard';
import { CardSkeleton } from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';
import SearchBar from '../../components/SearchBar';
import AdvancedFilters, { Filters } from '../../components/AdvancedFilters';
import Pagination from '../../components/Pagination';
import { propertyService } from '../../services/propertyService';

export default function AllProperties() {
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
      const query = {
        page,
        limit: 12,
        search: params.get('search') || undefined,
        city: params.get('city') || filters.city,
        type: params.get('type') || filters.type,
        minRent: filters.minRent,
        maxRent: filters.maxRent,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
      };
      const res = await propertyService.list(query);
      const list = res?.properties || res?.data || res || [];
      setItems(Array.isArray(list) ? list : []);
      setTotalPages(res?.totalPages || res?.pages || Math.ceil((res?.total || 0) / 12) || 1);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [params, page, filters]);

  return (
    <div className="section py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2"><HomeIcon className="w-7 h-7 text-primary-600" /> All Properties</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Browse our complete collection of rental homes.</p>
      </div>

      <div className="mb-6 space-y-3">
        <SearchBar variant="page" />
        <div className="flex justify-end">
          <AdvancedFilters initial={filters} onChange={setFilters} />
        </div>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={HomeIcon} title="No properties found" description="Try adjusting your search or filters to find more homes." />
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
