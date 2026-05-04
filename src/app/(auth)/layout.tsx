import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Image
        src="/auth-background.svg"
        alt=""
        fill
        className="pointer-events-none absolute inset-0 object-cover opacity-30"
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <main className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/95 p-8 shadow-2xl shadow-black/20 backdrop-blur-lg dark:bg-zinc-900/95 dark:border-zinc-700/60">
            <Link
              href="/"
              className="mb-6 inline-flex text-lg font-semibold text-violet-950 transition hover:text-violet-700 dark:text-white"
            >
              HR Backoffice
            </Link>

            {children}
          </div>
        </main>

        <section className="flex min-h-[640px] flex-1 flex-col justify-center gap-8 px-6 py-12 text-white sm:px-10 lg:px-16">
          <div className="max-w-xl rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm">
            <span className="inline-flex rounded-full bg-violet-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-violet-200">
              HR made easy
            </span>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Human resources processes in your pocket.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-violet-100/80">
              Centralize hiring, onboarding, payroll, and people operations in
              one secure, modern HR backoffice.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
