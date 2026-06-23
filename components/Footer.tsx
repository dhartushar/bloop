import Link from "next/link";
import PawLogo from "./PawLogo";

export default function Footer() {
  return (
    <footer className="bg-forest text-mint-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm lg:flex-row lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <PawLogo className="size-5 text-paw" />
          <span className="font-display text-lg font-extrabold text-paw">
            Bloop
          </span>
          <span className="text-mint-100/70">— pet boarding, made simple.</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="transition-colors duration-150 hover:text-paw"
          >
            Home
          </Link>
          <Link
            href="/gurgaon"
            className="transition-colors duration-150 hover:text-paw"
          >
            Gurgaon
          </Link>
        </nav>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-mint-100/60">
        Made with care in Gurgaon · Not affiliated with the listed facilities.
      </p>
    </footer>
  );
}
