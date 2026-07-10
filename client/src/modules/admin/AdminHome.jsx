import { Typography, Paper, Box } from '@mui/material';

function AdminHome() {
  return (
    <Box py={3}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Manage users, properties, and bookings from here.</Typography>
      </Paper>
    </Box>
  );
}

export default AdminHome;
