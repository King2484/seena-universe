import Link from 'next/link';

export default function SharedHeader() {
  return (
    <header className="absolute top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
      <Link href="/" className="text-white text-xl font-display tracking-widest uppercase hover:opacity-70 transition-opacity pointer-events-auto">
        455 Haus
      </Link>
      <nav className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-white pointer-events-auto">
        <Link href="/raiyas" className="hover:opacity-70 transition-opacity">Raiyas</Link>
        <Link href="/pilates" className="hover:opacity-70 transition-opacity">Pilates</Link>
        <Link href="/art" className="hover:opacity-70 transition-opacity">Art Studio</Link>
      </nav>
    </header>
  );
}
