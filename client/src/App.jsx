import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Slots from "./pages/Slots";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import TempleDetails from "./pages/TempleDetails";
import BookingReceipt from "./pages/BookingReceipt";

import AddTemple from "./pages/AddTemple";
import ViewTemples from "./pages/ViewTemples";
import EditTemple from "./pages/EditTemple";

import AddSlot from "./pages/AddSlot";
import ViewSlots from "./pages/ViewSlots";

import AdminBookings from "./pages/AdminBookings";

import AdminRoute from "./components/AdminRoute";

import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<Home />} />

      <Route path="/slots/:templeId" element={<Slots />} />

      <Route path="/my-bookings" element={<MyBookings />} />

      <Route path="/temple/:id" element={<TempleDetails />} />

      <Route path="/receipt" element={<BookingReceipt />} />

      <Route path="/profile" element={<Profile />} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-temple"
        element={
          <AdminRoute>
            <AddTemple />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/view-temples"
        element={
          <AdminRoute>
            <ViewTemples />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/edit-temple/:id"
        element={
          <AdminRoute>
            <EditTemple />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-slot"
        element={
          <AdminRoute>
            <AddSlot />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/view-slots"
        element={
          <AdminRoute>
            <ViewSlots />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <AdminRoute>
            <AdminBookings />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;