
import { motion } from "motion/react"

import { Code, Menu, X } from "lucide-react"

import { useTranslation } from "react-i18next"

import { LoginModal } from "../components/LoginModal"
import { Link } from "react-router-dom"
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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
        <div className="cyber-h2 text-lg sm:text-xl md:text-2xl text-(--accent-cyan) tracking-wide flex items-center gap-1 sm:gap-2">
          <Code className="inline-block w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />

          <span className="truncate">{t("header.name")}</span>

          <span className="text-xs sm:text-sm text-gray-400 ml-1 sm:ml-2 whitespace-nowrap">({language})</span>
        </div>

        {/* Desktop Navigation */}

        <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:gap-8">
          {isNav ? (
            <Link
              to={"/"}
              className="cyber-body text-xs sm:text-sm text-gray-300 hover:text-(--accent-cyan) transition-colors uppercase tracking-wide"
            >
              Home
            </Link>
          ) : (
            links.map((link, idx) => (
              <a
                key={idx}
                href={`#${link}`}
                className="cyber-body text-xs sm:text-sm text-gray-300 hover:text-(--accent-cyan) transition-colors uppercase tracking-wide"
              >
                {link}
              </a>
            ))
          )}
          <LoginModal />
        </div>

        {/* Mobile Menu Button */}

        <button
          className="lg:hidden text-(--accent-cyan) p-1 sm:p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}

      {mobileMenuOpen && (
        <motion.div
          className="lg:hidden backdrop-blur-lg bg-[rgba(0,4,19,0.95)] border-t-2 border-(--accent-cyan)/30 overflow-hidden"
          style={{ transformOrigin: "top" }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 sm:gap-4">
           {isNav ? (
            <Link
              to={"/"}
              className="cyber-body text-xs sm:text-sm text-gray-300 hover:text-(--accent-cyan) transition-colors uppercase tracking-wide py-2"
            >
              Home
            </Link>
          ) : (
            links.map((link, idx) => (
              <a
                key={idx}
                href={`#${link}`}
                className="cyber-body text-xs sm:text-sm text-gray-300 hover:text-(--accent-cyan) transition-colors uppercase tracking-wide py-2"
              >
                {link}
              </a>
            ))
          )}
            <LoginModal />
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
