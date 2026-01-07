import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

import { backendRoutes } from "../lib/config";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = React.useState(
    Cookies.get("access_token") || ""
  );

  const navigate = useNavigate();

  /**
   * If an access token is present then will make a request to the backend and retrieve the current user information
   * @returns {Promise<any>}
   */
  async function me() {
    if (!accessToken) {
      toast.error("You are not logged in");
      navigate("/auth");
    }
    try {
      const userRes = await axios.get(backendRoutes.user.me, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return userRes.data;
    } catch (err) {
      toast.error(err.response.data.detail);
      logout();
      navigate("/auth");
    }
  }

  /**
   * Signs in the user with the provided credentials
   *
   * @param {{username: string, password: string}} form
   * @returns {Promise<void>}
   */
  async function signIn(form) {
    try {
      const signInRes = await axios.post(backendRoutes.auth.login, form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      Cookies.set("access_token", signInRes.data.access_token, {
        expires: 7,
        secure: true,
      });
      setAccessToken(signInRes.data.access_token);
      navigate("/dashboard");
      toast.success("You have successfully logged in");
    } catch (err) {
      toast.error(err.response.data.detail);
    }
  }

  /**
   * Registers the user with the provided credentials and if successful redirects to the dashboard and adds the access token to local storage
   * @param {{email: string, name: string, password: string, password_confirm: string, dob: string}} form
   * @returns {Promise<void>}
   */
  async function register(form) {
    try {
      await axios.post(backendRoutes.user.newUser, form);

      toast.success("You have successfully registered");
    } catch (err) {
      toast.error(err.response.data.detail);
    }
  }

  /**
   * When called will remove the access token from local storage and redirect the user back to the home page
   * @returns {void}
   */
  function logout() {
    Cookies.remove("access_token");
    setAccessToken("");
    navigate("/");
    toast.success("You have successfully logged out");
    return;
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, me, signIn, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 *
 * @returns {{accessToken: string, setAccessToken: React.Dispatch<React.SetStateAction<string>>, me: () => Promise<any>, signIn: (form: {
    username: string;
    password: string;
}) => Promise<void>, register: (form: {
    email: string;
    name: string;
    password: string;
    dob: string;
}) => Promise<void>, logout: () => void}}
 */
export const useAuth = () => React.useContext(AuthContext);
