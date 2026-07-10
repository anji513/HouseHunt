import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Grid, TextField, Stack } from '@mui/material';
import { getProperties } from '../../services/api';
import PropertyCard from '../../components/PropertyCard';

function SearchResults() {
  const [properties, setProperties] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getProperties().then((res) => setProperties(res.data.properties || [])).catch(() => setProperties([]));
  }, []);

  const filtered = properties.filter((property) => {
    const search = query.toLowerCase();
    return !search || property.title.toLowerCase().includes(search) || property.location.toLowerCase().includes(search) || property.propertyType.toLowerCase().includes(search);
  });

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>Search Results</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField fullWidth label="Search by title, location, or type" value={query} onChange={(e) => setQuery(e.target.value)} />
      </Paper>
      <Grid container spacing={3}>
        {filtered.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SearchResults;
