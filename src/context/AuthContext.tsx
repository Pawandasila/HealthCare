"use client";
import { createContext, ReactNode, useState } from "react";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

interface UserInfoType {
  id: number;
  name: string;
  email: string;
  phone_no: string;
  user_id: string;
  user_type: string;
  email_verified: boolean;
  phone_verified: boolean;
  aadhar_verified: boolean;
  pan_verified: boolean;
  p_address: string;
  date_joined: string;
  last_login: string;
  status: boolean;
  referral: any;
  VendorInfo: any;
}

interface AccessTokenType {
  access: string;
  refresh: string;
}

interface GFContextType {
  authToken: AccessTokenType | null;
  setAuthToken: Dispatch<SetStateAction<AccessTokenType | null>>;
  logout: () => void;
  baseURL: string;
  userInfo: UserInfoType | null;
  setUserInfo: Dispatch<SetStateAction<UserInfoType | null>>;
}

export type { GFContextType };

const GFContext = createContext<GFContextType>({
  authToken: null,
  setAuthToken: () => {},
  logout: () => {},
  baseURL: "",
  userInfo: null,
  setUserInfo: () => {},
});

const GFProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  const baseURL = "http://192.168.113.252:8000";

  let router = useRouter();
  let [authToken, setAuthToken] = useState<AccessTokenType | null>(
    typeof window !== "undefined" && localStorage.getItem("accessToken")
      ? JSON.parse(
          (typeof window !== "undefined" &&
            localStorage.getItem("accessToken")) ||
            "{}"
        )
      : null
  );

  let [userInfo, setUserInfo] = useState<UserInfoType | null>(
    typeof window !== "undefined" && localStorage.getItem("userInfo")
      ? JSON.parse(
          (typeof window !== "undefined" && localStorage.getItem("userInfo")) ||
            "{}"
        )
      : null
  );


  let userLogout = () => {
    setAuthToken(null);
    typeof window !== "undefined" && localStorage.removeItem("accessToken");
    typeof window !== "undefined" && localStorage.removeItem("userInfo");
    router.push("/auth/login");
  };

  let ContextData: GFContextType = {
    authToken,
    setAuthToken,
    logout: userLogout,
    baseURL,
    userInfo,
    setUserInfo,
  };

  return (
    <GFContext.Provider value={ContextData}>{children}</GFContext.Provider>
  );
};

export { GFContext, GFProvider };