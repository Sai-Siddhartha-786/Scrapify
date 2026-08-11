import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookPickup from './pages/BookPickup';
import Rates from './pages/Rates';
import Rewards from './pages/Rewards';
import HowItWorks from './pages/HowItWorks';
import { Loader2 } from 'lucide-react';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFDF7]">
        <Loader2 className="w-8 h-8 text-forest-500 animate-spin" />
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFDF7]">
        <Loader2 className="w-8 h-8 text-forest-500 animate-spin" />
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" /> : children;
}

function AppLayout({ children, showNav = true }) {
  return (
    <>
      {showNav && <Navbar />}
      {children}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Landing /></AppLayout>} />
      <Route path="/login" element={<GuestRoute><AppLayout showNav={false}><Login /></AppLayout></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><AppLayout showNav={false}><Register /></AppLayout></GuestRoute>} />
      <Route path="/rates" element={<AppLayout><Rates /></AppLayout>} />
      <Route path="/rewards" element={<AppLayout><Rewards /></AppLayout>} />
      <Route path="/how-it-works" element={<AppLayout><HowItWorks /></AppLayout>} />
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="/book" element={<ProtectedRoute><AppLayout><BookPickup /></AppLayout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1C4532',
              color: '#F0FFF4',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '12px',
              padding: '12px 20px',
            },
            success: {
              iconTheme: { primary: '#52B788', secondary: '#fff' },
            },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
