import { Box, CircularProgress, Typography } from '@mui/material';

function Loader() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={5}>
      <CircularProgress />
      <Typography mt={2}>Loading...</Typography>
    </Box>
  );
}

export default Loader;
