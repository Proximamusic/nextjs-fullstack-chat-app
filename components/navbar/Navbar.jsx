"use client";
import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  async function logout() {
    signOut({ callbackUrl: "/" });
  }
  return (
    <nav className="topbar">
      <Link href={"/chats"}>
        <Image
          src="/assets/logo.png"
          width={200}
          height={30}
          alt="logo"
          className="logo"
        />
      </Link>

      <div className="menu">
        <Link
          href={"/chats"}
          className={`text-heading4-bold ${
            pathname.includes("/chats") && "text-red-1"
          }`}
        >
          Chats
        </Link>
        <Link
          href={"/contacts"}
          className={`text-heading4-bold ${
            pathname.includes("/contacts") && "text-red-1"
          }`}
        >
          Contacts
        </Link>
        <Logout sx={{ color: "#737373", cursor: "pointer" }} onClick={logout} />
        <Image
          src={session?.user?.profilePicture || "/assets/person.jpg"}
          alt="profile"
          width={50}
          height={50}
        />
      </div>
    </nav>
  );
}

export default Navbar;
