"use client";
import { createContext, ReactNode, useState } from "react";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
// import { json } from "stream/consumers";

// interface UserInfoType {
//   id: number;
//   name: string;
//   email: string;
//   phone_no: string;
//   user_id: string;
//   user_type: string;
//   email_verified: boolean;
//   phone_verified: boolean;
//   aadhar_verified: boolean;
//   pan_verified: boolean;
//   p_address: string;
//   date_joined: string;
//   last_login: string;
//   status: boolean;
//   referral: any;
//   VendorInfo: any;
// }

interface AccessTokenType {
  access: string;
  refresh: string;
}

interface GFContextType {
  authToken: AccessTokenType | null;
  setAuthToken: Dispatch<SetStateAction<AccessTokenType | null>>;
  logout: () => void;
  baseURL: string;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
}

export type { GFContextType };

const GFContext = createContext<GFContextType>({
  authToken: null,
  setAuthToken: () => {},
  logout: () => {},
  baseURL: "",
  login: async () => ({ success: false, error: "Not implemented" }),
  register: async () => ({ success: false, error: "Not implemented" }),
});

const GFProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  // const baseURL = "http://127.0.0.1:8000";

  const router = useRouter();
  const [authToken, setAuthToken] = useState<AccessTokenType | null>(
    typeof window !== "undefined" && localStorage.getItem("accessToken")
      ? JSON.parse(
          (typeof window !== "undefined" &&
            localStorage.getItem("accessToken")) ||
            "{}"
        )
      : null
  );

  // let [userInfo, setUserInfo] = useState<UserInfoType | null>(
  //   typeof window !== "undefined" && localStorage.getItem("userInfo")
  //     ? JSON.parse(
  //         (typeof window !== "undefined" && localStorage.getItem("userInfo")) ||
  //           "{}"
  //       )
  //     : null
  // );
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const user = { username: email, password };
      const res = await fetch(baseURL + '/auth/token/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 200) {
        const data = await res.json();
        setAuthToken(data);
        localStorage.setItem("accessToken", JSON.stringify(data));
        router.push("/dashboard");
        return { success: true };
      } else if (res.status === 401) {
        return { success: false, error: "Invalid email or password. Please check your credentials and try again." };
      } else if (res.status === 400) {
        const errorData = await res.json().catch(() => ({}));
        return { success: false, error: errorData.detail || "Invalid request. Please check your input." };
      } else if (res.status === 429) {
        return { success: false, error: "Too many login attempts. Please try again later." };
      } else if (res.status >= 500) {
        return { success: false, error: "Server error. Please try again later." };
      } else {
        return { success: false, error: "Login failed. Please try again." };
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { success: false, error: "Network error. Please check your internet connection and try again." };
      }
      return { success: false, error: "An unexpected error occurred. Please try again." };
    }
  };

  const register = async (userData: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(baseURL + '/auth/register/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.status === 201) {
        // Auto-login after successful registration
        return await login(userData.email, userData.password);
      } else if (res.status === 400) {
        const errorData = await res.json().catch(() => ({}));
        if (errorData.email) {
          return { success: false, error: "This email is already registered. Please use a different email or try logging in." };
        } else if (errorData.username) {
          return { success: false, error: "This username is already taken. Please choose a different one." };
        } else if (errorData.password) {
          return { success: false, error: "Password does not meet requirements. Please choose a stronger password." };
        } else {
          return { success: false, error: errorData.detail || "Invalid registration data. Please check your input." };
        }
      } else if (res.status === 429) {
        return { success: false, error: "Too many registration attempts. Please try again later." };
      } else if (res.status >= 500) {
        return { success: false, error: "Server error. Please try again later." };
      } else {
        return { success: false, error: "Registration failed. Please try again." };
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { success: false, error: "Network error. Please check your internet connection and try again." };
      }
      return { success: false, error: "An unexpected error occurred. Please try again." };
    }
  };

  const userLogout = () => {
    setAuthToken(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof window !== "undefined" && localStorage.removeItem("accessToken");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof window !== "undefined" && localStorage.removeItem("userInfo");
    router.push("/auth/login");
  };

  const ContextData: GFContextType = {
    authToken,
    setAuthToken,
    logout: userLogout,
    baseURL,
    login,
    register,
  };

  return (
    <GFContext.Provider value={ContextData}>{children}</GFContext.Provider>
  );
};

export { GFContext, GFProvider };