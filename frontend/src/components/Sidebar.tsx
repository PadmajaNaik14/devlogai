"use client";

export default function Sidebar() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <div className="h-full flex flex-col justify-between p-4">

      <div>

        <h2 className="text-xl font-bold mb-8">
          DevLog AI
        </h2>

        <ul className="space-y-2">

          <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
            Dashboard
          </li>

          <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
            Journals
          </li>

          <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
            Calendar
          </li>

          <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
            Analytics
          </li>

          <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
            AI Studio
          </li>

        </ul>

      </div>

      <div className="border-t pt-4">

        <p className="font-semibold">
          User
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