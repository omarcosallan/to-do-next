"use client";

import { User } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface UserNavProps {
  user: User;
  logout: () => void;
}

export default function UserNav({ user, logout }: UserNavProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.photoURL as string}></AvatarImage>
          <AvatarFallback>
            {user?.displayName ? user.displayName[0] : "Fallback"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="space-x-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <Separator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setIsOpenMenu(false)}>
            <Link className="w-full" href="/tasks">
              Tarefas
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpenMenu(false)}>
            <Link className="w-full" href="dashboard">
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <Separator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button className="w-full" onClick={() => logout()}>
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
