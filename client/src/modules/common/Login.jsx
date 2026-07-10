import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../../components/Toast';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form.email, form.password);
      setToast({ open: true, message: 'Login successful', severity: 'success' });
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'owner') navigate('/owner');
      else navigate('/renter');
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || 'Login failed', severity: 'error' });
    }
  };

  return (
    <Box display="flex" justifyContent="center" py={5}>
      <Paper elevation={3} sx={{ p: 4, width: { xs: '100%', md: 420 } }}>
        <Typography variant="h5" mb={2}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" margin="normal" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
        <Typography mt={2}>
          <Link to="/forgot-password">Forgot password?</Link>
        </Typography>
      </Paper>
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

export default Login;
