"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import { Separator } from "./ui/separator";
import UserNav from "./user-nav";

export function MainNav() {
  const { user } = useAuth();
  return (
    <nav>
      <div className="flex justify-between items-center px-5 md:px-20 py-3">
        <Link className="text-2xl font-bold" href="/tasks">
          TO DO LIST
        </Link>
        <div className="flex items-center gap-4">
          {user && <UserNav />}
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </nav>
  );
}
