"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    try {

      setError("");

      const result = await loginUser({

        email,

        password

      });

      localStorage.setItem(

        "token",

        result.access_token

      );

      router.push("/dashboard");

    }

    catch (err: any) {

      setError(

        err.response?.data?.detail ||

        "Login Failed"

      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-100">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-[#89023E]">

          DevLog AI

        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">

          AI-Powered Developer Journal

        </p>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">

          <button className="flex-1 bg-white rounded-lg py-2 font-semibold shadow">

            Login

          </button>

          <button

            className="flex-1 text-gray-500"

            onClick={() => router.push("/register")}

          >

            Register

          </button>

        </div>

        <input

          className="w-full rounded-xl border border-gray-300 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"

          placeholder="Email"

          value={email}

          onChange={(e) =>

            setEmail(e.target.value)

          }

        />

        <div className="relative mb-4">

          <input

            className="w-full rounded-xl border border-gray-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"

            placeholder="Password"

            type={showPassword ? "text" : "password"}

            value={password}

            onChange={(e) =>

              setPassword(e.target.value)

            }

          />

          <button

            type="button"

            onClick={() =>

              setShowPassword(

                !showPassword

              )

            }

            className="absolute right-4 top-3 text-gray-500"

          >

            👁

          </button>

        </div>

        {

          error &&

          <p className="text-red-500 text-sm mb-4">

            {error}

          </p>

        }

        <button

          onClick={handleLogin}

          className="w-full bg-[#89023E] hover:bg-green-700 active:scale-95 transition-all text-white rounded-xl py-3 font-semibold"

        >

          Continue →

        </button>

      </div>

    </div>

  );

}