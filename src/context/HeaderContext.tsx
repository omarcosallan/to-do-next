"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface HeaderContextType {
  visible: boolean;
}

export const HeaderContext = createContext({} as HeaderContextType);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user) return setVisible(true);
    setVisible(false);
  }, [user]);

  return (
    <HeaderContext.Provider value={{ visible }}>
      {visible && children}
    </HeaderContext.Provider>
  );
}
