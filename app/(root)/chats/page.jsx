"use client";
import { useSession } from "next-auth/react";
import React from "react";

function Chats() {
  const { data: sessionData } = useSession();
  return <div>{sessionData?.user?.email}</div>;
}

export default Chats;
