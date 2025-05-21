import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiMail } from 'react-icons/fi'
import Logo from './Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tentang Re-Enviro */}
          <div>
            <div className="flex items-center mb-4">
              <Logo className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold">Re-Enviro</span>
            </div>
            <p className="text-primary-100 mb-6">
              Mendorong perubahan positif untuk lingkungan Indonesia melalui aksi nyata dan kolaborasi.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-accent-400 transition-colors" aria-label="Instagram">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-accent-400 transition-colors" aria-label="Twitter">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-accent-400 transition-colors" aria-label="LinkedIn">
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-accent-400 transition-colors" aria-label="YouTube">
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Link Cepat */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ecoact" className="text-primary-100 hover:text-white transition-colors">
                  EcoAct
                </Link>
              </li>
              <li>
                <Link to="/dana-hijau" className="text-primary-100 hover:text-white transition-colors">
                  Dana Hijau
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-primary-100 hover:text-white transition-colors">
                  Masuk
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-primary-100 hover:text-white transition-colors">
                  Daftar
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-100 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <div className="flex items-center space-x-3 mb-3">
              <FiMail className="h-5 w-5 text-primary-300" />
              <a href="mailto:info@reenviro.id" className="text-primary-100 hover:text-white transition-colors">
                info@reenviro.id
              </a>
            </div>
            <p className="text-primary-100">
              Jl. Hijau Lestari No. 25<br />
              Jakarta Selatan, 12345<br />
              Indonesia
            </p>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tetap Terhubung</h3>
            <p className="text-primary-100 mb-3">
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
                className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg w-full transition-colors font-medium"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-300 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Re-Enviro. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-primary-300 hover:text-white text-sm transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="/privacy" className="text-primary-300 hover:text-white text-sm transition-colors">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer