import { Navigate, Route, Routes } from "react-router-dom";
// import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Create_New_Package from "./pages/Create_New_Package";
import Header from './components/Header';
import AssignRoles from "./pages/AssignRoles";
import AdminOrders from "./pages/AdminOrders";
import MyBookings from "./pages/MyBookings";
import PackageCard from "./components/PackageCard";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to='/' replace />; // Redirect to home if user role is not allowed
  }


  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className='min-h-screen bg-gradient-to-br
      from-white-700 via-yellow-200 to-white flex items-center justify-center relative overflow-hidden'
    >

      {isAuthenticated && user?.isVerified && <Header />}
      <main className="flex-grow pt-20 md:pt-24 lg:pt-28 flex items-center justify-center">
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <PackageCard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create-package'
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Data Entry']}>
              <Create_New_Package />
            </ProtectedRoute>
          }
        />
        <Route
          path='/assign-roles'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AssignRoles />
            </ProtectedRoute>
          }
        />
        <Route
          path='/orders'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/my_bookings'
          element={
            <ProtectedRoute allowedRoles={['User']}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route
          path='/forgot-password'
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* Catch-all routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>

      <Toaster />
      </main>
    </div>
  );
}

export default App;
