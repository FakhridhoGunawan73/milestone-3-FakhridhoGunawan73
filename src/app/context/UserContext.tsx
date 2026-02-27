"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Profile = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  role?: string;
} | null;

interface UserContextType {
  profile: Profile;
  loading: boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <UserContext.Provider value={{ profile, loading, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useProfile must be used within UserProvider");
  return context;
};
