/** Custom paw-print logo mark (per DESIGN.md §6 — logo is a custom SVG, not a Lucide icon). */
export default function PawLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <ellipse cx="6" cy="11" rx="2" ry="2.6" />
      <ellipse cx="10.2" cy="7.4" rx="2" ry="2.6" />
      <ellipse cx="13.8" cy="7.4" rx="2" ry="2.6" />
      <ellipse cx="18" cy="11" rx="2" ry="2.6" />
      <path d="M12 12.2c-2.7 0-5 2-5 4.3 0 1.7 1.3 2.7 3 2.7 1 0 1.4-.4 2-.4s1 .4 2 .4c1.7 0 3-1 3-2.7 0-2.3-2.3-4.3-5-4.3Z" />
    </svg>
  );
}
