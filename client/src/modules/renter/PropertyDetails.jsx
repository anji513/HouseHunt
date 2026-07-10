import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createBooking, getPropertyById } from '../../services/api';
import Toast from '../../components/Toast';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    getPropertyById(id).then((res) => setProperty(res.data.property)).catch(() => setProperty(null));
  }, [id]);

  const handleBook = async () => {
    try {
      await createBooking({ propertyId: id });
      setToast({ open: true, message: 'Booking request sent', severity: 'success' });
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || 'Booking failed', severity: 'error' });
    }
  };

  if (!property) return <Typography>Loading...</Typography>;

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>{property.title}</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>{property.description}</Typography>
        <Typography mt={2}>Location: {property.location}</Typography>
        <Typography>Rent: ${property.rentAmount}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleBook}>Book Now</Button>
      </Paper>
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

export default PropertyDetails;
