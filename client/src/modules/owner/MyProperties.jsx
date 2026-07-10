import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Stack, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteProperty, getOwnerDashboard } from '../../services/api';
import Toast from '../../components/Toast';

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  const loadProperties = async () => {
    try {
      const res = await getOwnerDashboard();
      setProperties(res.data.properties || []);
    } catch (error) {
      setProperties([]);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);
      setToast({ open: true, message: 'Property removed', severity: 'success' });
      loadProperties();
    } catch (error) {
      setToast({ open: true, message: 'Unable to remove property', severity: 'error' });
    }
  };

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>My Properties</Typography>
      <Stack spacing={2}>
        {properties.map((property) => (
          <Paper key={property._id} sx={{ p: 3 }}>
            <Typography variant="h6">{property.title}</Typography>
            <Typography>{property.location}</Typography>
            <Chip label={property.availability ? 'Available' : 'Booked'} sx={{ mt: 1 }} />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button component={Link} to={`/owner/properties/edit/${property._id}`} variant="outlined">Edit</Button>
              <Button color="error" onClick={() => handleDelete(property._id)}>Delete</Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

export default MyProperties;
