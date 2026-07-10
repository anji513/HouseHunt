import { Typography, Paper, Box } from '@mui/material';

function RenterHome() {
  return (
    <Box py={3}>
      <Typography variant="h4" gutterBottom>Renter Dashboard</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Browse listings, search homes, and review your bookings.</Typography>
      </Paper>
    </Box>
  );
}

export default RenterHome;
