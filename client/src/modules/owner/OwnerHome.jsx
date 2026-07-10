import { Typography, Paper, Box } from '@mui/material';

function OwnerHome() {
  return (
    <Box py={3}>
      <Typography variant="h4" gutterBottom>Owner Dashboard</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Manage your properties and incoming bookings here.</Typography>
      </Paper>
    </Box>
  );
}

export default OwnerHome;
