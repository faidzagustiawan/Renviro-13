import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: 'Dewi Anggraini',
    role: 'Relawan',
    text: 'Menjadi relawan melalui Re-Enviro telah memberikan saya kesempatan untuk berkontribusi langsung pada lingkungan. Proses pendaftaran yang mudah dan komunitas yang supportif membuat pengalaman saya sangat menyenangkan.',
    avatar: 'https://images.pexels.com/photos/3770254/pexels-photo-3770254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    role: 'Pendana Proyek',
    text: 'Transparansi yang ditunjukkan oleh Re-Enviro dalam penggunaan dana membuat saya percaya platform ini. Saya bisa melihat secara langsung bagaimana dana saya digunakan untuk proyek-proyek yang berdampak nyata.',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 3,
    name: 'Siti Rahayu',
    role: 'Pemimpin Komunitas',
    text: 'Sebagai pemimpin komunitas lokal, kerja sama dengan Re-Enviro telah membantu kami mendapatkan dukungan untuk merealisasikan proyek konservasi hutan di desa kami. Dampaknya sungguh luar biasa!',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 4,
    name: 'Ahmad Firdaus',
    role: 'Pengajar',
    text: 'Program edukasi lingkungan Re-Enviro di sekolah kami telah menginspirasi murid-murid untuk lebih peduli pada lingkungan. Kurikulumnya sangat menarik dan praktis.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  }
]

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Dengarkan pengalaman dari relawan, pendana, dan mitra komunitas yang telah bergabung dengan gerakan Re-Enviro.
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              initial={false}
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-primary-100 dark:border-primary-800"
                      />
                      <div>
                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        
                        <blockquote className="text-gray-700 dark:text-gray-300 italic mb-6">
                          "{testimonial.text}"
                        </blockquote>
                        
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-primary-600 dark:text-primary-400">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigasi dan Indikator */}
          <div className="flex items-center justify-center mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-2 mr-4 rounded-full bg-white dark:bg-gray-800 shadow-md text-primary-800 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Testimonial sebelumnya"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeIndex === index 
                      ? 'bg-primary-600 dark:bg-primary-400' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-2 ml-4 rounded-full bg-white dark:bg-gray-800 shadow-md text-primary-800 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Testimonial berikutnya"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection