'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const toggleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu)

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span>📞 +(91) 9266-113-222 | +(91) 9266-114-222 | +(91) 9266-115-222</span>
            <span>✉️ info@ggims.com</span>
            <span>| RCIC No. R706955</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a href="https://www.facebook.com" target="_blank" className="hover:text-blue-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" className="hover:text-blue-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.youtube.com" target="_blank" className="hover:text-red-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" className="hover:text-pink-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="white"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/></svg>
              </a>
            </div>
            <a href="/pay-now" className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs font-semibold transition-colors">
              Pay Now
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="https://ggims.com/uploads/settings/17226197901585.png"
              alt="GGIMS Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/about" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide">
              About Us
            </Link>
            <Link href="/our-experts" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide">
              Our Experts
            </Link>
            <Link href="/current-job" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide">
              Current Jobs
            </Link>

            {/* Migrate Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide flex items-center gap-1">
                Migrate <span className="text-xs">▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-xl rounded-lg py-3 z-50 min-w-[200px] flex-col">
                <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase">Canada</div>
                <Link href="/canada-express-entry" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Canada Express Entry</Link>
                <Link href="/canada-pr-benefits" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Canada PR Benefits</Link>
                <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase mt-1">Canada PNP</div>
                <Link href="/alberta-provincial-nominee-program" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Alberta PNP</Link>
                <Link href="/british-columbia-pnp" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">British Columbia PNP</Link>
                <Link href="/canada-pnp" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Canada PNP</Link>
                <Link href="/manitoba-provincial-nominee-program" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Manitoba PNP</Link>
                <Link href="/nova-scotia-provincial-nominee-program" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Nova Scotia PNP</Link>
                <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase mt-1">Other</div>
                <Link href="/australia-pr-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Australia</Link>
                <Link href="/portugal-job-seeker-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Portugal</Link>
                <Link href="/sweden-job-seeker-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Sweden</Link>
                <Link href="/germany-opportunity-card" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Germany</Link>
              </div>
            </div>

            {/* Study Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide flex items-center gap-1">
                Study <span className="text-xs">▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-xl rounded-lg py-3 z-50 min-w-[180px] flex-col">
                <Link href="/study-in-australia" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Study in Australia</Link>
                <Link href="/study-in-canada" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Study in Canada</Link>
                <Link href="/study-in-germany" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Study in Germany</Link>
                <Link href="/study-in-italy" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Study in Italy</Link>
                <Link href="/study-in-uk" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Study in UK</Link>
                <Link href="/study-in-usa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Study in USA</Link>
              </div>
            </div>

            {/* Investment Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide flex items-center gap-1">
                Investment <span className="text-xs">▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-xl rounded-lg py-3 z-50 min-w-[200px] flex-col">
                <Link href="/uk-investor-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">UK Investor Visa</Link>
                <Link href="/usa-investor-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">USA Investor Visa</Link>
                <Link href="/new-zealand-investor-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">New Zealand Investor Visa</Link>
                <Link href="/UAE-golden-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">UAE Golden Visa</Link>
                <Link href="/quebec-investor-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Quebec Investor Visa</Link>
                <Link href="/portugal-golden-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Portugal Golden Visa</Link>
                <Link href="/malta-Investment-Visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Malta Investment Visa</Link>
                <Link href="/spain-investment-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Spain Investment Visa</Link>
              </div>
            </div>

            {/* We Offer Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide flex items-center gap-1">
                We Offer <span className="text-xs">▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-xl rounded-lg py-3 z-50 min-w-[180px] flex-col">
                <Link href="/post-landing" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Post Landing</Link>
                <Link href="/pre-landing-services" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Pre Landing Services</Link>
                <Link href="/spouse-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Spouse Visa</Link>
                <Link href="/tourist-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Tourist Visa</Link>
                <Link href="/business-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Business Visa</Link>
                <Link href="/canada-super-visa" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Canada Super Visa</Link>
                <Link href="/ielts" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">IELTS</Link>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide flex items-center gap-1">
                Resources <span className="text-xs">▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-xl rounded-lg py-3 z-50 min-w-[180px] flex-col">
                <Link href="/news" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">News</Link>
                <Link href="/photos" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Gallery</Link>
                <Link href="/videos" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Videos</Link>
                <Link href="/videos/frames-in-motion" className="px-6 py-1.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700">↳ Frames in Motion</Link>
                <Link href="/contact" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Contact</Link>
                <Link href="/blog" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Blog</Link>
                <Link href="/faq" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">FAQ</Link>
                <Link href="/career" className="px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Career</Link>
              </div>
            </div>

            <Link href="/contact" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors uppercase tracking-wide">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            <Link href="/about" className="block py-2 text-sm text-gray-700 hover:text-blue-700 font-semibold">About Us</Link>
            <Link href="/our-experts" className="block py-2 text-sm text-gray-700 hover:text-blue-700 font-semibold">Our Experts</Link>
            <Link href="/current-job" className="block py-2 text-sm text-gray-700 hover:text-blue-700 font-semibold">Current Jobs</Link>

            <div>
              <button onClick={() => toggleMenu('migrate')} className="w-full text-left py-2 text-sm text-gray-700 font-semibold flex justify-between">
                Migrate <span>{openMenu === 'migrate' ? '▲' : '▼'}</span>
              </button>
              {openMenu === 'migrate' && (
                <div className="pl-4 space-y-1">
                  <Link href="/canada-express-entry" className="block py-1 text-sm text-gray-600">Canada Express Entry</Link>
                  <Link href="/canada-pnp" className="block py-1 text-sm text-gray-600">Canada PNP</Link>
                  <Link href="/australia-pr-visa" className="block py-1 text-sm text-gray-600">Australia</Link>
                  <Link href="/germany-opportunity-card" className="block py-1 text-sm text-gray-600">Germany</Link>
                </div>
              )}
            </div>

            <div>
              <button onClick={() => toggleMenu('study')} className="w-full text-left py-2 text-sm text-gray-700 font-semibold flex justify-between">
                Study <span>{openMenu === 'study' ? '▲' : '▼'}</span>
              </button>
              {openMenu === 'study' && (
                <div className="pl-4 space-y-1">
                  <Link href="/study-in-canada" className="block py-1 text-sm text-gray-600">Study in Canada</Link>
                  <Link href="/study-in-australia" className="block py-1 text-sm text-gray-600">Study in Australia</Link>
                  <Link href="/study-in-germany" className="block py-1 text-sm text-gray-600">Study in Germany</Link>
                  <Link href="/study-in-uk" className="block py-1 text-sm text-gray-600">Study in UK</Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="block py-2 text-sm text-gray-700 hover:text-blue-700 font-semibold">Contact Us</Link>
            <Link href="/blog" className="block py-2 text-sm text-gray-700 hover:text-blue-700 font-semibold">Blog</Link>
            <Link href="/news" className="block py-2 text-sm text-gray-700 hover:text-blue-700 font-semibold">News</Link>
          </div>
        )}
      </nav>
    </header>
  )
}