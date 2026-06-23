import Link from "next/link";
import { Search, Scale, HelpCircle, ArrowRight } from "lucide-react";

const PROBLEMS = [
  {
    icon: Search,
    title: "Hard to find the good ones",
    body: "Trustworthy boarding spots hide in WhatsApp groups and word of mouth. There's no single place to look.",
  },
  {
    icon: Scale,
    title: "No easy way to compare",
    body: "Prices, facilities, and ratings live in a dozen different places. Comparing options means a dozen open tabs.",
  },
  {
    icon: HelpCircle,
    title: "You don't know what to ask",
    body: "CCTV? Vet on call? Live updates? It's hard to judge a place when you don't know what matters.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Browse",
    body: "See every trusted boarding facility in Gurgaon, all in one clean list.",
  },
  {
    step: "2",
    title: "Check facilities",
    body: "Compare ratings, prices, and what each place actually offers — at a glance.",
  },
  {
    step: "3",
    title: "Call directly",
    body: "Found the one? Call or WhatsApp them yourself. No middleman, no markup.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero — full-bleed dark green is the lowest layer of the z-stack:
          green background < dog head (z-10) < CTA button (z-20). */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-forest px-6 py-24 text-center">
        <h1 className="font-display text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
          Pet boarding in Gurgaon,
          <br />
          <em className="italic text-paw">worth wagging about.</em>
        </h1>

        {/* CTA wrapper positions the dog head behind the button. The top margin
            leaves room so the big head clears the headline above. */}
        <div className="relative mt-64 inline-block sm:mt-72">
          {/* Dog head — sits above the green (z-10) but below the button (z-20),
              nudged down so the button overlaps its lower edge. pointer-events-none
              keeps it from blocking the CTA click. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dog-head.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-full left-1/2 z-10 w-64 -translate-x-1/2 translate-y-12 select-none sm:w-80 lg:w-96"
          />
          <Link
            href="/gurgaon"
            className="relative z-20 inline-flex items-center gap-2 rounded-full bg-paw px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-paw-hover"
          >
            Explore Gurgaon Boardings
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      {/* Problem block */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <h2 className="text-center font-display text-3xl font-extrabold text-ink lg:text-4xl">
          Finding good boarding shouldn&apos;t be this hard
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PROBLEMS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-line bg-surface p-8 shadow-sm"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-mint-200 text-leaf">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-mint-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="text-center font-display text-3xl font-extrabold text-ink lg:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-center text-base text-muted">
            Three steps. That&apos;s the whole thing.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-paw text-xl font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA repeat */}
      <section className="bg-forest py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-extrabold text-white lg:text-4xl">
            Ready to find your dog&apos;s home away from home?
          </h2>
          <p className="mt-4 text-base text-mint-100">
            Browse every trusted boarding facility in Gurgaon — free, always.
          </p>
          <Link
            href="/gurgaon"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-paw px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-paw-hover"
          >
            Explore Gurgaon Boardings
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
