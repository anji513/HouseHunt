import { useState } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../../components/Toast';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setToast({ open: true, message: 'Password reset request sent', severity: 'success' });
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || 'Unable to send reset request', severity: 'error' });
    }
  };

  return (
    <Box display="flex" justifyContent="center" py={5}>
      <Paper elevation={3} sx={{ p: 4, width: { xs: '100%', md: 420 } }}>
        <Typography variant="h5" mb={2}>Forgot Password</Typography>
        <Typography mb={2}>Enter your email to receive reset instructions.</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Send Reset Link</Button>
        </form>
      </Paper>
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

export default ForgotPassword;
