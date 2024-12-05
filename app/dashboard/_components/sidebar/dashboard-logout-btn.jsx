"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

function DashBoardLogoutBtn() {
  const handleLogout = async () => {
    await signOut();
  };
  return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>;
}

export default DashBoardLogoutBtn;
