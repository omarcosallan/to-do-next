"use client";

import { auth } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextData {
  user: User | null | undefined;
  signInWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthProps) {
  const [user, setUser] = useState<User | null | undefined>(null);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((result) => {
          setAuthCookie(
            result.token,
            new Date(result.expirationTime).getTime()
          );
          setUser(user);
          router.push("/tasks");
        });
      } else {
        removeAuthCookie();
        setUser(null);
        router.push("/");
      }
    });
  }, []);

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((data) => {
        data.user.getIdTokenResult().then((result) => {
          router.push("/tasks");
          setAuthCookie(
            result.token,
            new Date(result.expirationTime).getTime()
          );
        });
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    removeAuthCookie();
    signOut(auth).then(() => {
      setUser(null);
      router.push("/");
    });
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export function setAuthCookie(token: string, age: number) {
  const cookieOptions = {
    maxAge: age,
    path: "/",
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  };

  setCookie(null, "task-authToken", token, cookieOptions);
}

export function removeAuthCookie() {
  const cookieOptions = {
    path: "/",
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  };

  destroyCookie(null, "task-authToken", {
    path: "/",
    cookieOptions,
  });
}
