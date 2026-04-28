import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <header className="mb-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:flex sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-300/20 font-semibold">
              HR
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                HR Backoffice
              </p>
              <p className="text-xs text-slate-400">Modern HR for every team</p>
            </div>
          </div>

          <nav className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 sm:mt-0">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#why-us" className="transition hover:text-white">
              Why Us
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <div className="mt-5 flex flex-wrap justify-end gap-3 sm:mt-0">
            <Link
              href="/signin"
              className="rounded-full border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Sign Up
            </Link>
          </div>
        </header>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold tracking-[0.24em] text-cyan-300 ring-1 ring-cyan-300/20">
                HR Backoffice
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Make HR processes easy and efficient
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Bring leave, payroll, performance and employee management
                  together in one platform. Manage HR workflows quickly with a
                  modern, mobile-friendly experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Try for Free
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Request Demo
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-950/80 p-5 text-center ring-1 ring-white/10">
                  <p className="text-3xl font-semibold text-white">15</p>
                  <p className="mt-2 text-sm text-slate-400">Days free trial</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5 text-center ring-1 ring-white/10">
                  <p className="text-3xl font-semibold text-white">4,500+</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Trusted companies
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5 text-center ring-1 ring-white/10">
                  <p className="text-3xl font-semibold text-white">100%</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Mobile-ready experience
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-cyan-500/10">
              <div className="rounded-[1.75rem] bg-slate-950/90 p-6 ring-1 ring-white/10">
                <div className="mb-6 flex items-center justify-between text-sm text-slate-400">
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    Single platform
                  </span>
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-300">
                    Built for SMBs
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-900 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      Employee Management
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Store all employee records in one place.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-900 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      Payroll
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Reduce errors and speed up payroll workflows.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-900 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      Performance
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Give your team goals and insights to improve performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                About Us
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built to simplify HR for modern teams
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                HR Backoffice is designed for small and growing companies that
                need a reliable, easy-to-use platform for employee records,
                payroll, and performance management. We help teams reduce
                administrative load and focus on people.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-200 ring-1 ring-white/10">
                <p className="text-3xl font-semibold text-white">Reliable</p>
                <p className="mt-2 text-sm text-slate-400">
                  Trusted by modern HR teams
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-200 ring-1 ring-white/10">
                <p className="text-3xl font-semibold text-white">Simple</p>
                <p className="mt-2 text-sm text-slate-400">
                  Easy workflows for every user
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-white">
            <h2 className="text-xl font-semibold">Leave Management</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Track requests, approvals, and usage reports from one dashboard.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-white">
            <h2 className="text-xl font-semibold">Payroll & Payments</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Manage employee payroll and keep costs under control.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-white">
            <h2 className="text-xl font-semibold">Performance Tracking</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Monitor KPIs, measure growth, and boost team motivation.
            </p>
          </article>
        </section>

        <section
          id="why-us"
          className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                Trusted solution
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Over 4,500 companies choose HR Backoffice
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Manage HR processes from one place with fast setup, easy use,
                and mobile access. A reliable human resources solution for teams
                of any size.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900 p-6 text-slate-200 ring-1 ring-white/10">
                <p className="text-3xl font-semibold text-white">39%</p>
                <p className="mt-2 text-sm text-slate-400">Time savings</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-6 text-slate-200 ring-1 ring-white/10">
                <p className="text-3xl font-semibold text-white">44%</p>
                <p className="mt-2 text-sm text-slate-400">Cost reduction</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-6 text-slate-200 ring-1 ring-white/10">
                <p className="text-3xl font-semibold text-white">100%</p>
                <p className="mt-2 text-sm text-slate-400">
                  Mobile compatibility
                </p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-6 text-slate-200 ring-1 ring-white/10">
                <p className="text-3xl font-semibold text-white">0</p>
                <p className="mt-2 text-sm text-slate-400">
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20"
        >
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Ready to make HR easier?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Reach out to learn more about HR Backoffice or book a demo. We
                help teams reduce paperwork, improve processes and scale faster.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Email
                </p>
                <p className="text-base font-semibold text-white">
                  hello@hr-backoffice.com
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Phone
                </p>
                <p className="text-base font-semibold text-white">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
