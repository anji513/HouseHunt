import { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPropertyById, updateProperty } from '../../services/api';
import Toast from '../../components/Toast';

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', location: '', rentAmount: '', propertyType: '', furnishingStatus: '', amenities: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    getPropertyById(id).then((res) => {
      const property = res.data.property || {};
      setForm({
        title: property.title || '',
        description: property.description || '',
        location: property.location || '',
        rentAmount: property.rentAmount || '',
        propertyType: property.propertyType || '',
        furnishingStatus: property.furnishingStatus || '',
        amenities: (property.amenities || []).join(', ')
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProperty(id, { ...form, amenities: form.amenities.split(',').map((item) => item.trim()).filter(Boolean) });
      setToast({ open: true, message: 'Property updated', severity: 'success' });
      navigate('/owner/properties');
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || 'Unable to update property', severity: 'error' });
    }
  };

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>Edit Property</Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <TextField label="Description" multiline rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <TextField label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            <TextField label="Rent Amount" type="number" value={form.rentAmount} onChange={(e) => setForm({ ...form, rentAmount: e.target.value })} required />
            <TextField label="Property Type" value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })} required />
            <TextField label="Furnishing Status" value={form.furnishingStatus} onChange={(e) => setForm({ ...form, furnishingStatus: e.target.value })} required />
            <TextField label="Amenities" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} helperText="Comma separated" />
            <Button type="submit" variant="contained">Update Property</Button>
          </Stack>
        </form>
      </Paper>
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

export default EditProperty;
