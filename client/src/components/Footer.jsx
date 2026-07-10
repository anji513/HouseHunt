import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, mt: 4, borderTop: '1px solid #eaeaea' }}>
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
          © 2026 HouseHunt. Rent smart, live better.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
