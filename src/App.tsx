import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Index from "./pages/Index";
import LoginForm from "./components/auth/LoginForm";
import AuthLayout from "./components/auth/AuthLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <AuthLayout>
              <LoginForm />
            </AuthLayout>
          } />
          <Route path="/register" element={
            <AuthLayout>
              <Registration />
            </AuthLayout>
          } />
          <Route path="/delivery" element={
            <AuthLayout requireAuth>
              <Index />
            </AuthLayout>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;