import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass mx-3 mt-3 flex items-center justify-between px-4 py-3 sm:mx-6 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span
            className="font-display text-xl tracking-brand"
            style={{ color: "var(--bordeaux)" }}
          >
            UNBOND
          </span>
          <span className="text-xs tracking-brand text-muted-foreground uppercase">
            Breaking Chains
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">Über</NavLink>
          <NavLink to="/profile">Profil</NavLink>
        </nav>

        <Link
          to="/dashboard"
          className="rounded-full px-4 py-2 text-sm font-display tracking-brand uppercase text-primary-foreground transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--terracotta)" }}
        >
          Start
        </Link>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: "/dashboard" | "/about" | "/profile"; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="font-display tracking-brand uppercase text-xs text-muted-foreground transition-colors hover:text-foreground"
      activeProps={{ style: { color: "var(--bordeaux)" } }}
    >
      {children}
    </Link>
  );
}
