import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiMoon, FiSun, FiLogOut } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import Logo from './Logo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate();


  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    window.location.reload();
    localStorage.removeItem('supabaseSession');
    logout()
    setIsProfileOpen(false)
    navigate("/", { replace: true });
    window.location.reload();
  }

  

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 text-base font-medium rounded-md transition-colors duration-300 
    ${isActive
      ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30'
      : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
    }`

  const headerClasses = `fixed w-full top-0 z-50 transition-colors duration-300 ease-in-out
    ${isScrolled
      ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md'
      : 'bg-transparent'
    }`

  const userName = user?.user_metadata?.full_name || user?.email || 'User'
  const avatarInitial = userName.charAt(0).toUpperCase()

  return (
    <header className={headerClasses}>
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary-800 dark:text-primary-100">Re-Enviro</span>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <NavLink to="/ecoact" className={navLinkClasses}>EcoAct</NavLink>
            <NavLink to="/dana-hijau" className={navLinkClasses}>Dana Hijau</NavLink>
            <NavLink to="/track-history" className={navLinkClasses}>Track History</NavLink>
            <NavLink to="/about" className={navLinkClasses}>Tentang Kami</NavLink>
          </div>

          {/* Auth dan Theme Toggle - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-primary-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-primary-800 dark:text-gray-200">{userName}</span>
                </button>

                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50"
                    onMouseLeave={() => setIsProfileOpen(false)} // ⬅️ Tutup jika cursor menjauh
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-primary-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-sm py-2 px-4">Masuk</Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-4">Daftar</Link>
              </>
            )}
          </div>

          {/* Menu Button - Mobile */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 py-2 rounded-lg bg-white dark:bg-gray-900 shadow-lg border border-border-color"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-1 px-2 py-3">
              <NavLink to="/ecoact" className={navLinkClasses}>EcoAct</NavLink>
              <NavLink to="/dana-hijau" className={navLinkClasses}>Dana Hijau</NavLink>
              <NavLink to="/track-history" className={navLinkClasses}>Track History</NavLink>
              <NavLink to="/about" className={navLinkClasses}>Tentang Kami</NavLink>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

              {user ? (
                <>

                  <span className="px-3 py-2 text-base font-medium rounded-md text-primary-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">{userName}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-base font-medium rounded-md text-primary-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 text-base font-medium rounded-md text-primary-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3 py-2 text-base font-medium rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

export default Header
