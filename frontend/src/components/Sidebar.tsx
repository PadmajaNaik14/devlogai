"use client";
import { useEffect } from "react";
import { useState } from "react";

import {
  getCurrentUser
} from "@/services/userService";

import Link from "next/link";

export default function Sidebar() {
  const [userName, setUserName] =
  useState("Loading...");
  useEffect(() => {

  const loadUser =
    async () => {

      try {

        const user =
          await getCurrentUser();

        setUserName(
          user.name
        );

      } catch {

        setUserName(
          "User"
        );

      }
    };

  loadUser();

}, []);

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <div className="h-full flex flex-col p-4">

      <div>

        <h2 className="text-xl font-bold mb-8">
          DevLog AI
        </h2>

        <ul className="space-y-2">
          <Link href="/dashboard">
          <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
            Dashboard
          </li>
          </Link>

          <Link href="/journals">
  <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
    Journals
  </li>
</Link>

          <Link href="/calendar">
  <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
    Calendar
  </li>
</Link>
          <Link href="/analytics">
          <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
            Analytics
          </li>
          </Link>


        </ul>

      </div>

      <div className="border-t pt-4">

      <p className="font-semibold">
  {userName}
</p>

<p className="text-sm text-gray-500">
  Logged In
</p>

        <button
          onClick={logout}
          className="mt-2 text-red-500"
        >
          Logout
        </button>

      </div>

    </div>

  );
}