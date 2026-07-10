import { Typography, Box, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box py={5} textAlign="center">
      <Typography variant="h3" gutterBottom>Find your perfect rental</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Discover trusted homes, manage listings, and book rentals in one place.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button component={Link} to="/register" variant="contained">Get Started</Button>
        <Button component={Link} to="/renter/properties" variant="outlined">Browse Properties</Button>
      </Stack>
    </Box>
  );
}

export default Home;
