"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.refresh(); // Refresh to update the UI after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-4 bg-red-500 text-white p-2 rounded"
    >
      Logout
    </button>
  );
}
