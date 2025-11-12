import React from "react"

import { motion } from "motion/react"

import { Code, Menu, X } from "lucide-react"

import { useTranslation } from "react-i18next"

import { LoginModal } from "../components/LoginModal"
import { Link, NavLink } from "react-router-dom"
import { useAppSelector } from "../store/hook"

interface HeaderProps {
  links: string[]
  mobileMenuOpen: boolean
  isNav: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  links,
  isNav,
}: HeaderProps) {
  const { t } = useTranslation()

  const language = useAppSelector((s) => s.ui.language)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(0,4,19,0.8)] border-b-2 border-(--accent-cyan)/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="cyber-h2 text-2xl text-(--accent-cyan) tracking-wide">
          <Code className="inline-block w-6 h-6 mr-2" />

          {t("header.name")}

          <span className="text-sm text-gray-400 ml-2">({language})</span>
        </div>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-8">
          {isNav ? (
            <Link
              to={"/"}
              className="cyber-body text-sm text-gray-300 hover:text-(--accent-cyan) transition-colors uppercase tracking-wide"
            >
              Home
            </Link>
          ) : (
            links.map((link, idx) => (
              <a
                key={idx}
                href={`#${link}`}
                className="cyber-body text-sm text-gray-300 hover:text-(--accent-cyan) transition-colors uppercase tracking-wide"
              >
                {link}
              </a>
            ))
          )}
          <LoginModal />
        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden text-(--accent-cyan)"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}

      {mobileMenuOpen && (
        <motion.div
          className="md:hidden backdrop-blur-lg bg-[rgba(0,4,19,0.95)] border-t-2 border-(--accent-cyan)/30 overflow-hidden"
          style={{ transformOrigin: "top" }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {["about", "projects", "experience", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="cyber-body text-sm text-gray-300 hover:text-(--accent-cyan) transition-colors uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`nav.${id}`)}
              </a>
            ))}
            <LoginModal />
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
