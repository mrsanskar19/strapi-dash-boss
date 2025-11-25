import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { NotificationProvider } from "@/contexts/NotificationContext";

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
import Files from "./pages/Files";
import Collections from "./pages/app/Collections";

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
import ApplicationSettings from "./pages/settings/ApplicationSettings";
import CollectionSettings from "./pages/settings/CollectionSettings";
import Teams from "./pages/settings/Teams";

//Database Pages
import DataStorage from "./pages/database/DataStorage";
import FileStorage from "./pages/database/FileStorage";
import SystemUsage from "./pages/database/SystemUsage";
import Backups from "./pages/database/Backups";

//API Pages
import ApiTokens from "./pages/api/ApiTokens";
import ServiceKeys from "./pages/api/ServiceKeys";
import LiveTrafficDashboard from "./pages/api/LiveTraffic";

import StartHere from "./pages/StartHere";
import Playground from "./pages/Playground";
import { AppLayout } from "./components/AppLayout";
import ApiOverview from "./pages/Api";
import { EndpointsOverview } from "./pages/endpoints/Overview";
import { ServiceEndpoints } from "./pages/endpoints/ServiceEndpoints";
import { AuthEnpoints } from "./pages/endpoints/AuthEndpoints";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
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
                <Route path="/app" element={<Applications />} />
                <Route path="/database" element={<Database />} />
                <Route path="/database/data-storage" element={<DataStorage />} />
                <Route path="/database/file-storage" element={<FileStorage />} />
                <Route path="/database/system-usage" element={<SystemUsage />} />
                <Route path="/database/backups" element={<Backups />} />
                <Route path="/files" element={<Files />} />
                <Route path="/api" element={<Api />} />
                <Route path="/api/tokens" element={<ApiTokens />} />
                <Route path="/api/service-keys" element={<ServiceKeys />} />
                <Route path="/api/live-traffic" element={<LiveTrafficDashboard />} />
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
              <Route path="/app/:slug" element={
                <ProtectedRoute>
                  <AppLayout/>
                </ProtectedRoute>
              }>
                <Route path="collections" element={<Collections/>}/>
                <Route path="" element={<ApplicationView />} />
                <Route path="col/:colSlug" element={<CollectionView />} />
                <Route path="settings" element={<ApplicationSettings />} />
                <Route path="col/:colSlug/settings" element={<CollectionSettings />} />
                <Route path="teams" element={<Teams />} />
                <Route path="api" element={<ApiOverview/>}/>
                <Route path="api/tokens" element={<ApiOverview/>}/>
                <Route path="api/access-manager" element={<ApiOverview/>}/>
                <Route path="endpoints" element={<EndpointsOverview/>}/>
                <Route path="endpoints-service" element={<ServiceEndpoints/>}/>
                <Route path="endpoints-auth" element={<AuthEnpoints/>}/>
                <Route path="*" element={<NotFound />} />
              </Route>

            </Routes>
          </TooltipProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
