import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Stack } from '@mui/material';
import { getAdminProperties } from '../../services/api';

function AllProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAdminProperties().then((res) => setProperties(res.data.properties || [])).catch(() => setProperties([]));
  }, []);

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>All Properties</Typography>
      <Stack spacing={2}>
        {properties.map((property) => (
          <Paper key={property._id} sx={{ p: 3 }}>
            <Typography>{property.title}</Typography>
            <Typography color="text.secondary">Owner: {property.ownerId?.name || 'Unknown'}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default AllProperties;
