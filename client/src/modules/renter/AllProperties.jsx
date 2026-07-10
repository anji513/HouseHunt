import { Box, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { getProperties } from '../../services/api';
import PropertyCard from '../../components/PropertyCard';

function AllProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then((res) => setProperties(res.data.properties || [])).catch(() => setProperties([]));
  }, []);

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>All Properties</Typography>
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AllProperties;
