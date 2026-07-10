import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './modules/common/Home';
import Login from './modules/common/Login';
import Register from './modules/common/Register';
import ForgotPassword from './modules/common/ForgotPassword';
import AdminHome from './modules/admin/AdminHome';
import AllUsers from './modules/admin/AllUsers';
import AllProperties from './modules/admin/AllProperties';
import AllBookings from './modules/admin/AllBookings';
import OwnerHome from './modules/owner/OwnerHome';
import AddProperty from './modules/owner/AddProperty';
import EditProperty from './modules/owner/EditProperty';
import MyProperties from './modules/owner/MyProperties';
import OwnerBookings from './modules/owner/OwnerBookings';
import RenterHome from './modules/renter/RenterHome';
import RenterAllProperties from './modules/renter/AllProperties';
import PropertyDetails from './modules/renter/PropertyDetails';
import BookingHistory from './modules/renter/BookingHistory';
import SearchResults from './modules/renter/SearchResults';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/properties" element={<AllProperties />} />
          <Route path="/admin/bookings" element={<AllBookings />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
          <Route path="/owner" element={<OwnerHome />} />
          <Route path="/owner/properties/add" element={<AddProperty />} />
          <Route path="/owner/properties/edit/:id" element={<EditProperty />} />
          <Route path="/owner/properties" element={<MyProperties />} />
          <Route path="/owner/bookings" element={<OwnerBookings />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/renter" element={<RenterHome />} />
          <Route path="/renter/properties" element={<RenterAllProperties />} />
          <Route path="/renter/properties/:id" element={<PropertyDetails />} />
          <Route path="/renter/bookings" element={<BookingHistory />} />
          <Route path="/renter/search" element={<SearchResults />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
