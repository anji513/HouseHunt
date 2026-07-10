import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../../components/Toast';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'user', currentLocation: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      setToast({ open: true, message: 'Registration successful', severity: 'success' });
      navigate('/login');
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || 'Registration failed', severity: 'error' });
    }
  };

  return (
    <Box display="flex" justifyContent="center" py={5}>
      <Paper elevation={3} sx={{ p: 4, width: { xs: '100%', md: 480 } }}>
        <Typography variant="h5" mb={2}>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" margin="normal" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField fullWidth label="Email" type="email" margin="normal" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <TextField fullWidth label="Phone" margin="normal" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <TextField select fullWidth label="Role" margin="normal" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <MenuItem value="user">Renter</MenuItem>
            <MenuItem value="owner">Owner</MenuItem>
          </TextField>
          <TextField fullWidth label="Current Location" margin="normal" value={form.currentLocation} onChange={(e) => setForm({ ...form, currentLocation: e.target.value })} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Create Account</Button>
        </form>
        <Typography mt={2}>
          <Link to="/login">Already have an account?</Link>
        </Typography>
      </Paper>
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
    </Box>
  );
}

export default Register;
