import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ImagePlus, Save } from 'lucide-react';
import { propertyService } from '../../services/propertyService';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader';

const amenitiesList = ['wifi', 'parking', 'gym', 'pool', 'ac', 'furnished', 'heating', 'laundry', 'elevator', 'security', 'balcony', 'petFriendly'];

export default function PropertyForm({ initial, id }: { initial?: any; id?: string }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    rent: initial?.rent || '',
    address: initial?.address || '',
    city: initial?.city || '',
    type: initial?.type || 'apartment',
    bedrooms: initial?.bedrooms || 1,
    bathrooms: initial?.bathrooms || 1,
    area: initial?.area || '',
    amenities: initial?.amenities || [],
    available: initial?.available ?? true,
  });
  const [images, setImages] = useState<string[]>(initial?.images || []);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 8).forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => setImages((p) => [...p, reader.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const toggleAmenity = (a: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x: string) => x !== a) : [...f.amenities, a],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'amenities') {
          (v as string[]).forEach((a) => fd.append('amenities', a));
        } else {
          fd.append(k, String(v));
        }
      });
      images.forEach((img) => {
        if (img.startsWith('data:')) {
          const blob = dataURLtoBlob(img);
          fd.append('images', blob);
        }
      });
      if (id) {
        await propertyService.update(id, fd);
        toast('Property updated successfully!', 'success');
      } else {
        await propertyService.create(fd);
        toast('Property listed successfully!', 'success');
      }
      navigate('/owner/properties');
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8 = new Uint8Array(n);
    for (let i = 0; i < n; i++) u8[i] = bstr.charCodeAt(i);
    return new Blob([u8], { type: mime });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold">Basic information</h3>
        <div>
          <label className="label">Title</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="e.g. Modern 2BHK apartment with city view" />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input resize-none" placeholder="Describe your property..." />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Address</label>
            <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input" placeholder="Street address" />
          </div>
          <div>
            <label className="label">City</label>
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input" placeholder="City" />
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold">Property details</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="label">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input">
              {['apartment', 'house', 'villa', 'studio', 'condo'].map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Monthly rent ($)</label>
            <input type="number" required min={0} value={form.rent} onChange={(e) => setForm({ ...form, rent: +e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Bedrooms</label>
            <input type="number" min={0} value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: +e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Bathrooms</label>
            <input type="number" min={0} value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: +e.target.value })} className="input" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Area (ft²)</label>
            <input type="number" min={0} value={form.area} onChange={(e) => setForm({ ...form, area: +e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Availability</label>
            <select value={String(form.available)} onChange={(e) => setForm({ ...form, available: e.target.value === 'true' })} className="input">
              <option value="true">Available</option>
              <option value="false">Rented</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {amenitiesList.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAmenity(a)}
              className={`chip capitalize transition ${form.amenities.includes(a) ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold">Images</h3>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:border-primary-400 transition"
        >
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
          <ImagePlus className="w-10 h-10 mx-auto text-slate-400" />
          <p className="text-sm font-medium mt-2">Click to upload images</p>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 8 images</p>
        </div>
        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group h-24 rounded-xl overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary !py-3 flex-1">
          {loading ? <Loader /> : <><Save className="w-4 h-4" /> {id ? 'Update property' : 'List property'}</>}
        </button>
        <button type="button" onClick={() => navigate(-1)} className="btn-outline !py-3">Cancel</button>
      </div>
    </form>
  );
}
