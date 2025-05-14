import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import LinksManager from './pages/LinksManager';
import PaymentLinks from './pages/PaymentLinks';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <React.Suspense 
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/payment" element={
                  <PrivateRoute>
                    <PaymentPage />
                  </PrivateRoute>
                } />
                <Route path="/payment/:linkId" element={
                  <PrivateRoute>
                    <PaymentPage />
                  </PrivateRoute>
                } />
                <Route path="/success" element={
                  <PrivateRoute>
                    <SuccessPage />
                  </PrivateRoute>
                } />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                } />
                <Route path="/admin/links" element={
                  <AdminRoute>
                    <LinksManager />
                  </AdminRoute>
                } />
                <Route path="/admin/payment-links" element={
                  <AdminRoute>
                    <PaymentLinks />
                  </AdminRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </React.Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;