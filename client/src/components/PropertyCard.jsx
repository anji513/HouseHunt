import { Card, CardContent, CardMedia, Typography, Button, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        component="img"
        height="180"
        image={property.images?.[0] ? `/uploads/${property.images[0]}` : 'https://via.placeholder.com/300x180?text=HouseHunt'}
        alt={property.title}
      />
      <CardContent>
        <Typography variant="h6">{property.title}</Typography>
        <Typography variant="body2" color="text.secondary">{property.location}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
          ${property.rentAmount}/month
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip label={property.propertyType} size="small" />
          <Chip label={property.furnishingStatus} size="small" />
        </Stack>
        <Button component={Link} to={`/renter/properties/${property._id}`} variant="contained" sx={{ mt: 2 }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
