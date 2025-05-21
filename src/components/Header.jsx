import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import Logo from './Logo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  
  // Tutup menu saat navigasi
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])
  
  // Deteksi scroll untuk mengubah tampilan header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const navLinkClasses = ({isActive}) => 
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
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            
            <Link to="/login" className="btn-outline text-sm py-2 px-4">Masuk</Link>
            <Link to="/signup" className="btn-primary text-sm py-2 px-4">Daftar</Link>
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
              onClick={toggleMenu}
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
              
              <Link 
                to="/login" 
                className="px-3 py-2 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Masuk
              </Link>
              <Link 
                to="/signup" 
                className="px-3 py-2 text-base font-medium rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Daftar
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

export default Header