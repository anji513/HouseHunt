import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import PublicLayout from './components/PublicLayout';
import ProtectedRoute, { RoleRedirect } from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import AllProperties from './pages/property/AllProperties';
import SearchResults from './pages/property/SearchResults';
import PropertyDetails from './pages/property/PropertyDetails';
import AddProperty from './pages/property/AddProperty';
import EditProperty from './pages/property/EditProperty';
import MyProperties from './pages/property/MyProperties';
import OwnerBookings from './pages/booking/OwnerBookings';
import BookingHistory from './pages/booking/BookingHistory';
import OwnerDashboard from './pages/dashboards/OwnerDashboard';
import RenterDashboard from './pages/dashboards/RenterDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProperties from './pages/admin/AdminProperties';
import AdminBookings from './pages/admin/AdminBookings';
import AdminApprovals from './pages/admin/AdminApprovals';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="section py-8">
      <Sidebar>{children}</Sidebar>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/properties" element={<AllProperties />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Owner */}
            <Route path="/owner" element={<ProtectedRoute roles={['owner']}><DashboardShell><OwnerDashboard /></DashboardShell></ProtectedRoute>} />
            <Route path="/owner/properties" element={<ProtectedRoute roles={['owner']}><DashboardShell><MyProperties /></DashboardShell></ProtectedRoute>} />
            <Route path="/owner/properties/new" element={<ProtectedRoute roles={['owner']}><DashboardShell><AddProperty /></DashboardShell></ProtectedRoute>} />
            <Route path="/owner/properties/:id/edit" element={<ProtectedRoute roles={['owner']}><DashboardShell><EditProperty /></DashboardShell></ProtectedRoute>} />
            <Route path="/owner/bookings" element={<ProtectedRoute roles={['owner']}><DashboardShell><OwnerBookings /></DashboardShell></ProtectedRoute>} />

            {/* Renter */}
            <Route path="/renter" element={<ProtectedRoute roles={['renter']}><DashboardShell><RenterDashboard /></DashboardShell></ProtectedRoute>} />
            <Route path="/renter/history" element={<ProtectedRoute roles={['renter']}><DashboardShell><BookingHistory /></DashboardShell></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute roles={['admin']}><DashboardShell><AdminDashboard /></DashboardShell></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><DashboardShell><AdminUsers /></DashboardShell></ProtectedRoute>} />
            <Route path="/admin/properties" element={<ProtectedRoute roles={['admin']}><DashboardShell><AdminProperties /></DashboardShell></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute roles={['admin']}><DashboardShell><AdminBookings /></DashboardShell></ProtectedRoute>} />
            <Route path="/admin/approvals" element={<ProtectedRoute roles={['admin']}><DashboardShell><AdminApprovals /></DashboardShell></ProtectedRoute>} />

            {/* Shared */}
            <Route path="/profile" element={<ProtectedRoute><DashboardShell><Profile /></DashboardShell></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><RoleRedirect /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
