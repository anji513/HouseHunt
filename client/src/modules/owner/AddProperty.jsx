import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../../services/api';
import Toast from '../../components/Toast';

function AddProperty() {
  const [form, setForm] = useState({ title: '', description: '', location: '', rentAmount: '', propertyType: '', furnishingStatus: '', amenities: '' });
  const [files, setFiles] = useState([]);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('title', form.title);
    payload.append('description', form.description);
    payload.append('location', form.location);
    payload.append('rentAmount', form.rentAmount);
    payload.append('propertyType', form.propertyType);
    payload.append('furnishingStatus', form.furnishingStatus);
    payload.append('amenities', form.amenities);
    Array.from(files).forEach((file) => payload.append('images', file));

    try {
      await createProperty(payload);
      setToast({ open: true, message: 'Property created', severity: 'success' });
      navigate('/owner/properties');
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || 'Unable to create property', severity: 'error' });
    }
  };

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>Add Property</Typography>
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
            <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} />
            <Button type="submit" variant="contained">Save Property</Button>
          </Stack>
        </form>
      </Paper>
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

export default AddProperty;
