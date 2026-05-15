"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOutActionAsync } from "../../actions/auth";

export default function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOutActionAsync();

      if (result.success) {
        router.push("/signin");
      }
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600/80 hover:bg-red-600 active:bg-red-700 disabled:bg-red-600/40 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 shadow-lg shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}
