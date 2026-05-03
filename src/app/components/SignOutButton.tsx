"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOutAction } from "../actions/auth";

export default function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOutAction();

      if (result.success) {
        router.push("/signin");
      }
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}
