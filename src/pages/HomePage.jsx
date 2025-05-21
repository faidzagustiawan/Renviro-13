import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiDollarSign, FiCheckCircle } from 'react-icons/fi'
import HeroSection from '../components/home/HeroSection'
import ImpactStats from '../components/home/ImpactStats'
import TestimonialSection from '../components/home/TestimonialSection'
import FaqSection from '../components/home/FaqSection'
import PhotoGallery from '../components/home/PhotoGallery'

const HomePage = () => {
  const observerRef = useRef(null)
  
  useEffect(() => {
    // Animasi scroll untuk elemen dengan kelas animate-fade-up
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    }, { threshold: 0.1 })
    
    const elements = document.querySelectorAll('.animate-fade-up')
    elements.forEach(el => observer.observe(el))
    
    observerRef.current = observer
    
    return () => {
      if (observerRef.current) {
        elements.forEach(el => observerRef.current.unobserve(el))
      }
    }
  }, [])
  
  return (
    <>
      <HeroSection />
      
      <ImpactStats />
      
      {/* Bagian Tentang Kami */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="animate-fade-up"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/6591154/pexels-photo-6591154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Tim relawan sedang menanam pohon" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200">
                Tentang Re-Enviro
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Re-Enviro adalah platform yang menghubungkan individu, komunitas, dan organisasi untuk melakukan aksi nyata demi lingkungan Indonesia yang lebih baik. Kami percaya bahwa perubahan positif dimulai dari tindakan kecil yang dilakukan secara kolektif.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Melalui program EcoAct dan Dana Hijau, kami memfasilitasi berbagai kegiatan seperti penanaman pohon, pembersihan pantai, edukasi lingkungan, hingga pendanaan untuk proyek-proyek lingkungan inovatif.
              </p>
              <div className="pt-4">
                <Link to="/about" className="btn-primary">
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bagian Program Utama */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">
              Program Utama Kami
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Bergabunglah dengan salah satu program kami dan mulai berkontribusi untuk lingkungan Indonesia yang lebih baik. Setiap aksi kecil dapat memberikan dampak besar!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* EcoAct */}
            <motion.div 
              className="card p-8 animate-fade-up"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-64 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Kegiatan relawan EcoAct" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-3">
                EcoAct
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Program aksi relawan yang memungkinkan Anda terlibat langsung dalam kegiatan lingkungan di seluruh Indonesia. Bergabunglah dalam kegiatan penanaman pohon, pembersihan pantai, dan edukasi lingkungan.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <FiCheckCircle className="text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Kegiatan reguler di seluruh Indonesia</span>
                </div>
                <div className="flex items-center">
                  <FiCheckCircle className="text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Bimbingan dari ahli lingkungan</span>
                </div>
                <div className="flex items-center">
                  <FiCheckCircle className="text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Sertifikat partisipasi</span>
                </div>
              </div>
              
              <Link to="/ecoact" className="btn-primary">
                Jelajahi EcoAct
              </Link>
            </motion.div>
            
            {/* Dana Hijau */}
            <motion.div 
              className="card p-8 animate-fade-up"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-64 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Proyek Dana Hijau" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-3">
                Dana Hijau
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Platform pendanaan untuk proyek-proyek lingkungan inovatif. Dukung inisiatif komunitas lokal, teknologi hijau, dan solusi kreatif untuk mengatasi masalah lingkungan di Indonesia.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <FiCheckCircle className="text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">100% transparan dalam penggunaan dana</span>
                </div>
                <div className="flex items-center">
                  <FiCheckCircle className="text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Pelaporan dampak yang terukur</span>
                </div>
                <div className="flex items-center">
                  <FiCheckCircle className="text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Bukti sertifikat donasi</span>
                </div>
              </div>
              
              <Link to="/dana-hijau" className="btn-primary">
                Dukung Proyek
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      
      <FaqSection />
      
      <PhotoGallery />
      
      {/* Call to Action */}
      <section className="py-20 bg-primary-700 dark:bg-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bergabunglah dengan Gerakan untuk Indonesia yang Lebih Hijau
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
            Bersama-sama, kita bisa menciptakan dampak positif untuk lingkungan dan komunitas kita.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="btn bg-white text-primary-700 hover:bg-gray-100 hover:text-primary-800">
              Menjadi Relawan
            </Link>
            <Link to="/dana-hijau" className="btn bg-accent-600 text-white hover:bg-accent-700">
              Dukung Proyek
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage