import { useState, useEffect } from "react"
import { Header } from "./sections/Header"
import { Outlet, useLocation } from "react-router-dom"

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const { pathname } = useLocation()
  const isNav = pathname !== "/"

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <div className=" text-white min-h-screen overflow-x-hidden ">
      {/* Content wrapper */}
      <div className="relative ">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          links={["about", "projects", "experience", "contact"]}
          isNav={isNav}
        />
        <Outlet />
      </div>
    </div>
  )
}
