"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="max-w-sm min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold">Acesse sua conta</h1>
      <p className="my-6 text-sm">
        Acesse sua conta com facilidade usando a conta Google. <br />
        Em poucos cliques, tenha acesso rápido aos nossos serviços, combinando
        praticidade e segurança.
      </p>

      <Button className="w-full" onClick={signInWithGoogle}>
        Entrar com Google
      </Button>
    </div>
  );
}
