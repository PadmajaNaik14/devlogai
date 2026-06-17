"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";

export default function LoginPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const result = await loginUser({
        email,
        password
      });

      localStorage.setItem(
        "token",
        result.access_token
      );

      alert("Login Successful");
      window.location.href ="/dashboard";

    } catch {

      alert("Login Failed");

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center">

      <div className="w-96 p-6 border rounded-lg">

        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white px-4 py-2 rounded w-full"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}