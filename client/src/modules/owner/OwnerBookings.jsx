import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Stack, Button } from '@mui/material';
import { getOwnerBookings, updateBookingStatus } from '../../services/api';
import Toast from '../../components/Toast';

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  const loadBookings = async () => {
    try {
      const res = await getOwnerBookings();
      setBookings(res.data.bookings || []);
    } catch (error) {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setToast({ open: true, message: 'Booking updated', severity: 'success' });
      loadBookings();
    } catch (error) {
      setToast({ open: true, message: 'Unable to update booking', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Box py={3}>
        <Typography variant="h5" gutterBottom>Owner Bookings</Typography>
        <Typography color="text.secondary">Loading bookings...</Typography>
      </Box>
    );
  }

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>Owner Bookings</Typography>
      {bookings.length === 0 ? (
        <Typography color="text.secondary">No bookings found.</Typography>
      ) : (
        <Stack spacing={2}>
          {bookings.map((booking) => (
            <Paper key={booking._id} sx={{ p: 3 }}>
              <Typography>{booking.propertyId?.title || 'Property'}</Typography>
              <Typography color="text.secondary">Status: {booking.bookingStatus}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => handleStatus(booking._id, 'confirmed')}>Approve</Button>
                <Button variant="outlined" color="error" onClick={() => handleStatus(booking._id, 'rejected')}>Reject</Button>
                <Button variant="outlined" onClick={() => handleStatus(booking._id, 'pending')}>Pending</Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

export default OwnerBookings;
