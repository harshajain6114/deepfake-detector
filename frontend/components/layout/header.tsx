"use client"

import { Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Upload" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/history", label: "History" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="border-b border-gray-800 bg-[#0B0B0B]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Shield className="w-8 h-8 text-[#FF1F1F] group-hover:scale-110 transition-transform" />
            <h1 className="text-2xl font-bold">
              <span className="text-white">DeepFake</span>
              <span className="text-[#FF1F1F]"> Defender</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors relative ${
                  pathname === item.href ? "text-[#FF1F1F]" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {pathname === item.href && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF1F1F]" />}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
