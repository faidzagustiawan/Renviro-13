import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import homepageImg from '../../assets/Homepage.jpg';


const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={homepageImg}
          alt="Hutan Indonesia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/50 dark:from-primary-950/90 dark:to-primary-900/70" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <motion.h1
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Bergabunglah dengan Gerakan untuk Indonesia yang Lebih Hijau
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-100 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Re-Enviro menghubungkan relawan, komunitas, dan pendana untuk menciptakan dampak lingkungan positif yang berkelanjutan.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                to="/signup"
                className="btn bg-white text-primary-700 hover:bg-gray-100 hover:text-primary-800"
              >
                Menjadi Relawan
              </Link>
              <Link
                to="/dana-hijau"
                className="btn bg-accent-600 text-white hover:bg-accent-700"
              >
                Dukung Proyek
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/20 hidden md:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Aksi Terbaru</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer">
                <p className="text-accent-300 text-sm font-medium mb-1">Pantai Bersih, Bali</p>
                <h4 className="text-white font-medium mb-2">Bersihkan Pantai Kuta dari Sampah Plastik</h4>
                <div className="flex justify-between text-sm text-gray-200">
                  <span>10 Mei 2025</span>
                  <span>25/30 Relawan</span>
                </div>
                <div className="mt-2 w-full bg-gray-300/30 rounded-full h-2">
                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer">
                <p className="text-accent-300 text-sm font-medium mb-1">Reboisasi, Jawa Barat</p>
                <h4 className="text-white font-medium mb-2">Penanaman 1000 Pohon di Kawasan Gunung Gede</h4>
                <div className="flex justify-between text-sm text-gray-200">
                  <span>15 Mei 2025</span>
                  <span>42/50 Relawan</span>
                </div>
                <div className="mt-2 w-full bg-gray-300/30 rounded-full h-2">
                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer">
                <p className="text-accent-300 text-sm font-medium mb-1">Edukasi, Jakarta</p>
                <h4 className="text-white font-medium mb-2">Workshop Daur Ulang untuk Anak Sekolah</h4>
                <div className="flex justify-between text-sm text-gray-200">
                  <span>20 Mei 2025</span>
                  <span>15/20 Relawan</span>
                </div>
                <div className="mt-2 w-full bg-gray-300/30 rounded-full h-2">
                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link to="/ecoact" className="text-white hover:text-accent-300 font-medium transition-colors">
                Lihat Semua Kegiatan →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection