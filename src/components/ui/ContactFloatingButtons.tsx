export default function ContactFloatingButtons() {
  return (
    <div className="fixed right-2 bottom-10 z-50 flex flex-col gap-3 sm:right-4 sm:bottom-12">
      <a
        href="tel:0348070196"
        aria-label="Gọi điện"
        className="contact-floating-button group flex h-12 w-12 items-center justify-center rounded-full bg-[#0c1b31]/95 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-[#1e2e4f]"
      >
        <span className="sr-only">Gọi điện</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.27 1.11l-2.2 2.2z" />
        </svg>
      </a>

      <a
        href="https://m.me/ducthang142000"
        target="_blank"
        rel="noreferrer"
        aria-label="Messenger"
        className="contact-floating-button group flex h-12 w-12 items-center justify-center rounded-full bg-[#0c1b31]/95 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-[#1e2e4f]"
      >
        <span className="sr-only">Messenger</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M12 2.04C6.48 2.04 2 6.5 2 12.1c0 3.11 1.59 5.86 4.1 7.49L5 22l2.56-1.06A9.98 9.98 0 0012 22.1c5.52 0 10-4.46 10-10.06S17.52 2.04 12 2.04zm1.37 13.34l-2.91-3.06-4.25 2.73 4.43-5.77 2.95 3.1 4.28-2.7-4.5 5.7z" />
        </svg>
      </a>
    </div>
  );
}
