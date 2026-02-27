import Login from '../../../components/form/Login';

export default function AdminLogin() {
  return (
    <>
      <main className="w-full min-h-screen flex items-center justify-center bg-dark">
        <h1 className="visually-hidden">Admin Login</h1>
        <section className="max-w-container w-full mx-auto px-4 py-base flex max-sm:flex-col items-stretch">
          {/* Left part */}
          <aside className="flex min-sm:flex-1 justify-center items-center">
            <div className="relative overflow-hidden flex w-full justify-center items-center gap-x-4">
              <img
                src="/assets/logo/bet-age-logo.svg"
                alt="Bet-age Logo"
                className="w-[clamp(40px,8vw,72px)] h-auto"
              />
              <h2 className="text-lg sm:text-xl font-semibold leading-tight">
                Bet-age Admin
              </h2>
            </div>
          </aside>

          <div className="hidden min-sm:block w-px self-stretch bg-[#375258]" />

          {/* Right part */}
          <section className="relative flex flex-col items-center justify-center gap-y-20 min-sm:flex-1 py-10">
            <header className="flex flex-col justify-center items-center">
              <h3 className="text-medium font-medium">Welcome</h3>
              <span className="mt-2 text-sm sm:text-base leading-snug">
                Please login to admin dashboard.
              </span>
            </header>
            <Login />
          </section>
        </section>
      </main>
    </>
  );
}
