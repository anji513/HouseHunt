import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Stack, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar className="container d-flex justify-content-between">
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          HouseHunt
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          ) : (
            <>
              {user.role === 'admin' && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
              {user.role === 'owner' && <Button color="inherit" component={Link} to="/owner">Owner</Button>}
              {user.role === 'user' && <Button color="inherit" component={Link} to="/renter">Renter</Button>}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
