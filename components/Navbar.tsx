import Link from "next/link";
import PawLogo from "./PawLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-line bg-line text-ink shadow-sm">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <PawLogo className="size-6 text-paw" />
          <span className="font-display text-2xl font-extrabold text-paw">
            Bloop
          </span>
        </Link>

        <Link
          href="/gurgaon"
          className="text-sm font-medium text-ink transition-colors duration-150 hover:text-paw"
        >
          Gurgaon
        </Link>
      </nav>
    </header>
  );
}
