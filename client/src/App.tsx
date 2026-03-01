/**
 * App.tsx — Kulooc V3
 * Routing complet : Landing + 5 plateformes (Client, Driver, Dispatcher, Fleet, Admin)
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";

// ── Pages ──────────────────────────────────────────────
const Landing       = lazy(() => import("./pages/Landing"));
const LoginPage     = lazy(() => import("./pages/LoginPage"));

// Client (User)
const ClientDashboard = lazy(() => import("./pages/client/ClientDashboard"));

// Driver
const DriverDashboard = lazy(() => import("./pages/driver/DriverDashboard"));

// Dispatcher
const DispatcherDashboard = lazy(() => import("./pages/dispatcher/DispatcherDashboard"));

// Fleet
const FleetDashboard = lazy(() => import("./pages/fleet/FleetDashboard"));

// Admin
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

// ── Loading Spinner ─────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 bg-[#E31837] rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>K</span>
        </div>
        <div className="w-6 h-6 border-2 border-white/10 border-t-[#E31837] rounded-full animate-spin" />
      </div>
    </div>
  );
}

// ── Router ──────────────────────────────────────────────
function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Landing */}
        <Route path="/" component={Landing} />

        {/* Login Pages */}
        <Route path="/client/login">
          {() => <LoginPage platform="client" redirectPath="/client" />}
        </Route>
        <Route path="/driver/login">
          {() => <LoginPage platform="driver" redirectPath="/driver" />}
        </Route>
        <Route path="/dispatcher/login">
          {() => <LoginPage platform="dispatcher" redirectPath="/dispatcher" />}
        </Route>
        <Route path="/fleet/login">
          {() => <LoginPage platform="fleet" redirectPath="/fleet" />}
        </Route>
        <Route path="/admin/login">
          {() => <LoginPage platform="admin" redirectPath="/admin" />}
        </Route>

        {/* Client Platform */}
        <Route path="/client" component={ClientDashboard} />
        <Route path="/client/:rest*" component={ClientDashboard} />

        {/* Driver Platform */}
        <Route path="/driver" component={DriverDashboard} />
        <Route path="/driver/:rest*" component={DriverDashboard} />

        {/* Dispatcher Platform */}
        <Route path="/dispatcher" component={DispatcherDashboard} />
        <Route path="/dispatcher/:rest*" component={DispatcherDashboard} />

        {/* Fleet Platform */}
        <Route path="/fleet" component={FleetDashboard} />
        <Route path="/fleet/:rest*" component={FleetDashboard} />

        {/* Admin Platform */}
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/:rest*" component={AdminDashboard} />

        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// ── App ─────────────────────────────────────────────────
function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "#ffffff",
                fontFamily: "'DM Sans', sans-serif",
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
