import Link from "next/link";
import Image from "next/image";
import HomeNavBar from "./HomeNavBar";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Image
        src="/auth-background.svg"
        alt=""
        fill
        className="pointer-events-none absolute inset-0 object-cover opacity-20"
      />

      <div className="relative">
        <HomeNavBar />

        {/* Hero Section */}
        <main className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex rounded-full bg-violet-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-violet-200">
                  HR made easy
                </span>
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Make HR processes easy and efficient
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-zinc-300">
                  Bring leave, payroll, performance and employee management
                  together in one platform. Manage HR workflows quickly with a
                  modern, mobile-friendly experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="inline-flex rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Try for Free
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Request Demo
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 pt-4">
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="text-3xl font-semibold text-white">15</p>
                  <p className="mt-2 text-sm text-zinc-400">Days free trial</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="text-3xl font-semibold text-white">4,500+</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Trusted companies
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="text-3xl font-semibold text-white">100%</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Mobile-ready experience
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-violet-300">
                    Employee Management
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Store all employee records in one place.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-violet-300">
                    Payroll
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Reduce errors and speed up payroll workflows.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-violet-300">
                    Performance
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Give your team goals and insights to improve performance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section id="features" className="mt-20 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white">
                Leave Management
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                Track requests, approvals, and usage reports from one dashboard.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white">
                Payroll & Payments
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                Manage employee payroll and keep costs under control.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white">
                Performance Tracking
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                Monitor KPIs, measure growth, and boost team motivation.
              </p>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-sm"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                  About Us
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Built to simplify HR for modern teams
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
                  HR Backoffice is designed for small and growing companies that
                  need a reliable, easy-to-use platform for employee records,
                  payroll, and performance management. We help teams reduce
                  administrative load and focus on people.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="text-2xl font-semibold text-white">Reliable</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Trusted by modern HR teams
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="text-2xl font-semibold text-white">Simple</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Easy workflows for every user
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section
            id="contact"
            className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-sm text-center"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
              Ready to start?
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Join thousands of companies using HR Backoffice
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-base leading-8 text-zinc-300">
              Start managing your HR operations more efficiently today. No
              credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Get Started Free
              </Link>
              <Link
                href="#"
                className="inline-flex rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Sales
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
