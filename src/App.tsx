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
import EditProfile from "./pages/profile/EditProfile";
import Notifications from "./pages/profile/Notifications";

//Billing Pages
import Billing from "./pages/Billing";
import Usage from "./pages/billing/Usage";
import Invoices from "./pages/billing/Invoices";
import PaymentMethods from "./pages/billing/PaymentMethods";

//Setting Pages
import ApplicationAccess from "./pages/settings/ApplicationAccess";
import GeneralSettings from "./pages/settings/General";
import NotificationsSettings from "./pages/settings/Notifications";
import SecuritySettings from "./pages/settings/Security";
import PreferencesSettings from "./pages/settings/Preferences";
import PasswordSettings from "./pages/settings/Password";

//Database Pages
import DataStorage from "./pages/database/DataStorage";
import FileStorage from "./pages/database/FileStorage";
import SystemUsage from "./pages/database/SystemUsage";
import Backups from "./pages/database/Backups";

//API Pages
import ApiTokens from "./pages/api/ApiTokens";
import EndpointAccess from "./pages/api/EndpointAccess";
import AccessManager from "./pages/api/AccessManager";

import StartHere from "./pages/StartHere";
import Playground from "./pages/Playground";

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
              <Route path="/dashboard" element={<Index />} />
              <Route path="/" element={<StartHere />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/:slug" element={<ApplicationView />} />
              <Route path="/collection/:slug" element={<CollectionView />} />
              <Route path="/database" element={<Database />} />
              <Route path="/database/data-storage" element={<DataStorage />} />
              <Route path="/database/file-storage" element={<FileStorage />} />
              <Route path="/database/system-usage" element={<SystemUsage />} />
              <Route path="/database/backups" element={<Backups />} />
              <Route path="/api" element={<Api />} />
              <Route path="/api/tokens" element={<ApiTokens />} />
              <Route path="/api/endpoint-access" element={<EndpointAccess />} />
              <Route path="/api/access-manager" element={<AccessManager />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/general" element={<GeneralSettings />} />
              <Route path="/settings/security" element={<SecuritySettings />} />
              <Route path="/settings/application-access" element={<ApplicationAccess />} />
              <Route path="/settings/preferences" element={<PreferencesSettings />} />
              <Route path="/settings/password" element={<PasswordSettings />} />
              <Route path="/settings/notifications" element={<NotificationsSettings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/notifications" element={<Notifications />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/billing/usage" element={<Usage />} />
              <Route path="/billing/invoices" element={<Invoices />} />
              <Route path="/billing/payment-methods" element={<PaymentMethods />} />

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
