"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const result = await registerUser({
        name,
        email,
        password
      });

      alert("Registration successful! Please login.");

      router.push("/login");

    } catch(error) {

      alert("Registration Failed");

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center">

      <div className="w-96 p-6 border rounded-lg">

        <h1 className="text-2xl font-bold mb-6">
          Register
        </h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Password"
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white px-4 py-2 rounded w-full"
          onClick={handleRegister}
        >
          Register
        </button>

      </div>

    </div>
  );
}