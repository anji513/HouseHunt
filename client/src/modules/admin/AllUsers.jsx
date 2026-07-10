import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Stack, Button, Chip } from '@mui/material';
import { approveOwner, deleteUser, getAdminUsers } from '../../services/api';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const res = await getAdminUsers();
      setUsers(res.data.users || []);
      setError('');
    } catch (error) {
      setError('Unable to load users.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (id) => {
    await approveOwner(id);
    loadUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <Box py={3}>
      <Typography variant="h5" gutterBottom>All Users</Typography>
      {loading ? (
        <Typography color="text.secondary">Loading users...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : users.length === 0 ? (
        <Typography color="text.secondary">No users found.</Typography>
      ) : (
        <Stack spacing={2}>
          {users.map((user) => (
            <Paper key={user._id} sx={{ p: 3 }}>
              <Typography>{user.name}</Typography>
              <Typography color="text.secondary">{user.email}</Typography>
              <Typography color="text.secondary">Role: {user.role === 'user' ? 'Renter' : user.role === 'owner' ? 'Owner' : 'Admin'}</Typography>
              <Box mt={1}>
                {user.role === 'owner' && <Chip label={user.isApproved ? 'Approved' : 'Pending'} size="small" sx={{ mr: 1 }} />}
              </Box>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {user.role === 'owner' && !user.isApproved && <Button variant="contained" onClick={() => handleApprove(user._id)}>Approve</Button>}
                <Button color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default AllUsers;
