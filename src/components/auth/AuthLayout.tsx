import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AuthLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthLayout = ({ children, requireAuth = false }: AuthLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (requireAuth && !session) {
        navigate("/login");
      } else if (!requireAuth && session) {
        navigate("/delivery");
      }
    };

    checkAuth();
  }, [navigate, requireAuth]);

  return <>{children}</>;
};

export default AuthLayout;