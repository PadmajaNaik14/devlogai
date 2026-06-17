import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold">
        DevLog AI
      </h1>

      <p className="mt-4 text-lg">
        AI Powered Developer Journal
      </p>

      <div className="mt-8 flex gap-4">

        <Link
          href="/login"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="border px-6 py-3 rounded"
        >
          Register
        </Link>

      </div>

    </main>
  );
}