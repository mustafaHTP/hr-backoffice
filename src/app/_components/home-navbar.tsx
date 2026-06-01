import { getSessionAsync } from "@/lib/auth";
import Link from "next/link";

export default async function HomeNavBar() {
  const session = await getSessionAsync();

  return (
    <nav className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-semibold text-white transition hover:text-violet-300"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-300 ring-1 ring-violet-300/30">
              HR
            </div>
            <span>HR Backoffice</span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full bg-violet-600 border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
