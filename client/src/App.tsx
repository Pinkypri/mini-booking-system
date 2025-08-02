// App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import ForgetPasswordPage from './pages/ForgetPasswordPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      
      {/* Protected route usage */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
