import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white px-6 py-12">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to access your HR dashboard.
          </p>
        </div>

        <form className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-violet-950 focus:ring-2 focus:ring-violet-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-violet-950 focus:ring-2 focus:ring-violet-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-full bg-violet-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don’t have an account?{" "}
          <Link
            href="/(auth)/signup"
            className="font-semibold text-violet-950 dark:text-violet-300 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
