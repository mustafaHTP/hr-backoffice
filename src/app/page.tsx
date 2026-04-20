export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-12 sm:px-10">
        <section className="rounded-3xl border border-zinc-200 bg-white/90 p-10 shadow-sm transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-800 dark:bg-violet-900/60 dark:text-violet-200">
                HR Backoffice
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
                İnsan kaynakları yönetimini tek ekranda kolaylaştırın.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg">
                Personel bilgileri, izin talepleri, bordro ve raporlar için
                modern bir yönetim paneli. Hızlı aksiyonlar ve güncel durum
                özetleriyle ekibinizi daha verimli yönetin.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-violet-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
                >
                  Panoya git
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >
                  Özellikleri keşfet
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:w-[42rem]">
              <div className="rounded-3xl bg-zinc-100 p-6 shadow-sm dark:bg-zinc-800">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  Çalışanlar
                </p>
                <p className="mt-4 text-3xl font-semibold">248</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Aktif çalışan kaydı
                </p>
              </div>
              <div className="rounded-3xl bg-zinc-100 p-6 shadow-sm dark:bg-zinc-800">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  İzin
                </p>
                <p className="mt-4 text-3xl font-semibold">12</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Bekleyen onay
                </p>
              </div>
              <div className="rounded-3xl bg-zinc-100 p-6 shadow-sm dark:bg-zinc-800">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  Bordro
                </p>
                <p className="mt-4 text-3xl font-semibold">Hazır</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Mart 2026 dönemi
                </p>
              </div>
              <div className="rounded-3xl bg-zinc-100 p-6 shadow-sm dark:bg-zinc-800">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  Raporlar
                </p>
                <p className="mt-4 text-3xl font-semibold">5</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Güncel analiz
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-colors duration-200 hover:border-violet-200 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
              Çalışan Yönetimi
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Personel profilleri, işe alım bilgileri ve yetenek verilerini tek
              bir merkezden yönetin.
            </p>
          </article>
          <article className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-colors duration-200 hover:border-violet-200 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
              İzin ve Devamsızlık
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              İzin taleplerini takip edin, onaylayın ve devamsızlık kayıtlarını
              kolayca yönetin.
            </p>
          </article>
          <article className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-colors duration-200 hover:border-violet-200 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
              Raporlama
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Performans, maliyet ve iş gücü analizleriyle hızlıca stratejik
              kararlar alın.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
