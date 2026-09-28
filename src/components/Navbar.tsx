import React, { useState } from 'react'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E8E5] bg-[#FBFBFA]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Custom geometric inline SVG isotype */}
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[#E8E8E5] bg-white group-hover:border-[#121314] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="3" fill="#FF4400" stroke="#FF4400" />
                <path d="M12 3v6M12 15v6M3 12h6M15 12h6" strokeLinecap="round" />
                <circle cx="12" cy="3" r="1.5" fill="currentColor" />
                <circle cx="12" cy="21" r="1.5" fill="currentColor" />
                <circle cx="3" cy="12" r="1.5" fill="currentColor" />
                <circle cx="21" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-semibold tracking-tight text-[#121314]">KESTRA</span>
              <span className="text-xs font-mono font-medium text-[#8F939A]">DB</span>
            </div>
          </a>

          {/* Engine Status pill */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-[#E8E8E5] bg-white px-2.5 py-0.5 text-[11px] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-[#346538] animate-pulse"></span>
            <span className="text-[#6B6F76]">Core v2.4.1</span>
            <span className="text-[#D4D4CE]">/</span>
            <span className="text-[#346538] font-medium">RAFT ACTIVE</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-[#6B6F76]">
          <a href="#console" className="hover:text-[#121314] transition-colors">Vector Console</a>
          <a href="#benchmarks" className="hover:text-[#121314] transition-colors">Benchmarks</a>
          <a href="#architecture" className="hover:text-[#121314] transition-colors">Architecture</a>
          <a href="#pricing" className="hover:text-[#121314] transition-colors">Pricing</a>
          <a href="#specs" className="hover:text-[#121314] transition-colors">Specs</a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded border border-[#E8E8E5] bg-white px-2.5 py-1.5 text-xs font-mono text-[#121314] hover:bg-[#F6F6F4] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>v2.4.1</span>
            <span className="rounded bg-[#F6F6F4] px-1 text-[10px] text-[#6B6F76]">14.2k</span>
          </a>

          <a
            href="#deploy"
            className="rounded bg-[#121314] px-3 py-1.5 text-xs font-mono text-white hover:bg-[#2A2A2A] transition-colors active:scale-[0.98]"
          >
            Deploy Node
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-8 w-8 items-center justify-center rounded border border-[#E8E8E5] text-[#121314]"
          aria-label="Toggle Navigation"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E8E5] bg-[#FBFBFA] px-4 py-4 space-y-3 font-mono text-xs uppercase tracking-wider">
          <a href="#console" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#6B6F76] hover:text-[#121314]">Vector Console</a>
          <a href="#benchmarks" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#6B6F76] hover:text-[#121314]">Benchmarks</a>
          <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#6B6F76] hover:text-[#121314]">Architecture</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#6B6F76] hover:text-[#121314]">Pricing</a>
          <div className="pt-2 flex flex-col gap-2">
            <a href="#deploy" className="text-center rounded bg-[#121314] py-2 text-white">Deploy Node</a>
          </div>
        </div>
      )}
    </header>
  )
}
