import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Stack } from '@mui/material';
import { getAdminBookings } from '../../services/api';

function AllBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAdminBookings().then((res) => setBookings(res.data.bookings || [])).catch(() => setBookings([]));
  }, []);

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>All Bookings</Typography>
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

export default AllBookings;
