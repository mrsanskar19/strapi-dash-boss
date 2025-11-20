import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

//All Pages 
import Index from "./pages/Index";
import Applications from "./pages/Applications";
import ApplicationView from "./pages/ApplicationView";
import Database from "./pages/Database";
import Api from "./pages/Api";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmailPage from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import CollectionView from "./pages/CollectionView";
import Profile from "./pages/Profile";
import { DashboardLayout } from "./components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Index />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/:slug" element={<ApplicationView />} />
              <Route path="/collection/:slug" element={<CollectionView />} />
              <Route path="/database" element={<Database />} />
              <Route path="/api" element={<Api />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile/view" element={<Profile />} />

              {/* Catch-all route should still be outside or last */}
              <Route path="*" element={<NotFound />} />
            </Route>

          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
