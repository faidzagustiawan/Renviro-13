import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiMail } from 'react-icons/fi'
import Logo from './Logo'


const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-200  dark:bg-back-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tentang Re-Enviro */}
          <div>
            <div className="flex items-center mb-4">
              <Logo className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary-700 dark:text-white">Re-Enviro</span>
            </div>
            <p className="mb-6 text-black dark:text-white">
              Mendorong perubahan positif untuk lingkungan Indonesia melalui aksi nyata dan kolaborasi.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-black hover:text-accent-400 transition-colors dark:text-white dark:hover:text-accent-400" aria-label="Instagram">
                <FiInstagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="text-black hover:text-accent-400 transition-colors dark:text-white dark:hover:text-accent-400" aria-label="Twitter">
              <FiTwitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="text-black hover:text-accent-400 transition-colors dark:text-white dark:hover:text-accent-400" aria-label="LinkedIn">
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="text-black hover:text-accent-400 transition-colors dark:text-white dark:hover:text-accent-400" aria-label="YouTube">
              <FiYoutube className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Link Cepat */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Link Cepat</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/ecoact" className="text-black hover:text-accent-400 dark:text-white dark:hover:text-accent-400 transition-colors">
                EcoAct
              </Link>
            </li>
            <li>
              <Link to="/dana-hijau" className="text-black hover:text-accent-400 dark:text-white dark:hover:text-accent-400 transition-colors">
                Dana Hijau
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black hover:text-accent-400 dark:text-white dark:hover:text-accent-400 transition-colors">
                Tentang Kami
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Kontak Kami</h3>
          <div className="flex items-center space-x-3 mb-3 text-black hover:text-accent-400 dark:text-white dark:hover:text-accent-400 transition-colors">
            <FiMail className="h-5 w-5 text-primary-300" />
            <a href="mailto:info@reenviro.id" className="">
              info@reenviro.id
            </a>
          </div>
          <p className="text-black dark:text-white">
            Jl. Hijau Lestari No. 25<br />
            Jakarta Selatan, 12345<br />
            Indonesia
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Tetap Terhubung</h3>
          <p className="text-black dark:text-white mb-3">
            Dapatkan update terbaru tentang aksi lingkungan kami.
          </p>
          <form className="space-y-2">
            <div>
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-2 rounded-lg bg-primary-800 border border-primary-700 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg w-full transition-colors font-medium"
            >
              Berlangganan
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 pt-8 border-t border-primary-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-black dark:text-white text-sm mb-4 md:mb-0">
            &copy; {currentYear} Re-Enviro. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-black hover:text-accent-400 dark:text-white dark:hover:text-accent-400 transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link to="/privacy" className="text-sm text-black hover:text-accent-400 dark:text-white dark:hover:text-accent-400 transition-colors">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </div>
    </footer >
  )
}

export default Footer