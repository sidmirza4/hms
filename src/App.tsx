import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AppointmentPage from './pages/AppointmentPage';
import AppointmentListPage from './pages/AppointmentListPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-accent/10">
        <div className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/appointment-list" element={<AppointmentListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
