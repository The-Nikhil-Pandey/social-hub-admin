import { useEffect, useState } from "react";
import { verifyToken } from "../api/auth";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setChecking(false);
        return;
      }
      try {
        const res = await verifyToken(token);
        if (res.msg === "Token is valid") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setChecking(false);
    };
    checkToken();
    interval = setInterval(checkToken, 5000);
    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated, checking };
}
