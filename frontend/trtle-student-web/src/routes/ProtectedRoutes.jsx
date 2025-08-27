import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const ProtectedRoutes = ({ children }) => {
  const navigator = useNavigate();
  const handleValidateTokenUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigator("/");
        return;
      }
      const response = await api.get(`/auth/validate`);
      if (response){
        navigator("/dashboard")
      }else{
        navigator("/");
      }
    } catch (error) {
      console.error(error);
      navigator("/");
    }
  }, [navigator]);

  useEffect(() => {
    handleValidateTokenUser()
  }, []);

  return <>{children}</>;
};

export default ProtectedRoutes;
