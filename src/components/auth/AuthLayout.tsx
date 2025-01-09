import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClientComponentClient } from "@supabase/auth-helpers-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthLayout = ({ children, requireAuth = false }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const supabase = createClientComponentClient();

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
  }, [navigate, requireAuth, supabase.auth]);

  return <>{children}</>;
};

export default AuthLayout;