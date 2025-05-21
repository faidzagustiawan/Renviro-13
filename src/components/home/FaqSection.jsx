import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const faqs = [
  {
    question: 'Bagaimana cara menjadi relawan di Re-Enviro?',
    answer: 'Untuk menjadi relawan, Anda hanya perlu membuat akun di platform kami dan pilih EcoAct. Dari situ, Anda bisa melihat daftar kegiatan yang tersedia, memilih yang sesuai minat Anda, dan mendaftar. Kami akan mengirimkan informasi lebih detail setelah pendaftaran Anda dikonfirmasi.'
  },
  {
    question: 'Apakah saya bisa membuat kegiatan relawan sendiri?',
    answer: 'Ya, komunitas dan organisasi dapat mengajukan proposal kegiatan relawan melalui platform kami. Proposal akan direview oleh tim kami untuk memastikan kesesuaian dengan nilai-nilai dan kriteria Re-Enviro sebelum dipublikasikan.'
  },
  {
    question: 'Bagaimana transparansi penggunaan dana di Dana Hijau?',
    answer: 'Kami berkomitmen pada transparansi penuh. Setiap proyek yang didanai memiliki laporan penggunaan dana yang dapat diakses oleh semua pendana. Laporan ini diupdate secara berkala dan mencakup bukti-bukti penggunaan dana serta progres proyek.'
  },
  {
    question: 'Apakah saya mendapatkan bukti keikutsertaan atau donasi?',
    answer: 'Ya, setelah berpartisipasi dalam kegiatan EcoAct, Anda akan menerima sertifikat partisipasi digital. Untuk pendana proyek Dana Hijau, Anda akan menerima sertifikat donasi yang dapat digunakan untuk keperluan dokumentasi atau pajak.'
  },
  {
    question: 'Apakah Re-Enviro tersedia di seluruh Indonesia?',
    answer: 'Saat ini kami memiliki kegiatan di beberapa kota besar di Indonesia seperti Jakarta, Surabaya, Bandung, Yogyakarta, Bali, dan Makassar. Kami terus berupaya untuk memperluas jangkauan ke lebih banyak wilayah di Indonesia.'
  },
  {
    question: 'Bagaimana saya bisa melaporkan masalah lingkungan di daerah saya?',
    answer: 'Anda dapat melaporkan masalah lingkungan melalui fitur "Laporkan Masalah" di aplikasi kami. Laporan Anda akan diteruskan ke tim kami dan mitra lokal yang relevan untuk ditindaklanjuti. Jika diperlukan, kami akan membuat kegiatan relawan untuk mengatasi masalah tersebut.'
  }
]

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0)
  
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Temukan jawaban atas pertanyaan umum tentang Re-Enviro, kegiatan relawan, dan pendanaan proyek.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-5 flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                {openIndex === index ? 
                  <FiChevronUp className="w-5 h-5 text-primary-600 dark:text-primary-400" /> : 
                  <FiChevronDown className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                }
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection