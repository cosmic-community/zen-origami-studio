'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home', icon: '🏠' },
    { href: '#interactive', label: 'Interactive Tool', icon: '🎨' },
    { href: '#tutorials', label: 'Tutorials', icon: '📖' },
    { href: '#collections', label: 'Collections', icon: '🌸' },
    { href: '#papers', label: 'Papers', icon: '📜' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-zen border-b border-zen-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className="font-zen text-xl zen-text-primary hover:text-zen-600 transition-colors zen-focus flex items-center gap-2"
          >
            <span className="text-2xl">🕊️</span>
            <span>Zen Origami Studio</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="zen-text-secondary hover:text-zen-600 transition-colors font-medium zen-focus flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zen-50/50"
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden zen-text-primary hover:text-zen-600 transition-colors zen-focus"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 bg-white/95 backdrop-blur-md rounded-b-xl border border-zen-200/50 border-t-0">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center gap-3 w-full text-left px-4 py-3 zen-text-secondary hover:text-zen-600 hover:bg-zen-50/50 transition-all zen-focus"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}