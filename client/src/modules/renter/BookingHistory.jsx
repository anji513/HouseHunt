import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Stack } from '@mui/material';
import { getUserBookings } from '../../services/api';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getUserBookings().then((res) => setBookings(res.data.bookings || [])).catch(() => setBookings([]));
  }, []);

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>Booking History</Typography>
      <Stack spacing={2}>
        {bookings.map((booking) => (
          <Paper key={booking._id} sx={{ p: 3 }}>
            <Typography>{booking.propertyId?.title || 'Property'}</Typography>
            <Typography color="text.secondary">Status: {booking.bookingStatus}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default BookingHistory;
