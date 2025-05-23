import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const photos = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    alt: 'Penanaman pohon di area reboisasi',
    caption: 'Penanaman pohon di Gunung Gede'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/3519667/pexels-photo-3519667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    alt: 'Pembersihan pantai dari sampah plastik',
    caption: 'Pembersihan Pantai Kuta, Bali'
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    alt: 'Edukasi lingkungan untuk anak-anak',
    caption: 'Edukasi lingkungan di SD Cinta Alam'
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/8061596/pexels-photo-8061596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    alt: 'Pengumpulan sampah anorganik untuk didaur ulang',
    caption: 'Program daur ulang di Jakarta Selatan'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/6591145/pexels-photo-6591145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    alt: 'Pembagian bibit tanaman untuk warga',
    caption: 'Distribusi bibit tanaman di Yogyakarta'
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/6186961/pexels-photo-6186961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    alt: 'Workshop pembuatan kompos',
    caption: 'Workshop kompos komunitas di Bandung'
  }
]

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  
  const openPhoto = (photo) => {
    setSelectedPhoto(photo)
    document.body.style.overflow = 'hidden'
  }
  
  const closePhoto = () => {
    setSelectedPhoto(null)
    document.body.style.overflow = 'auto'
  }
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">
            Lihat Dampak dalam Aksi
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Foto-foto kegiatan nyata dari proyek dan kegiatan relawan yang telah dilakukan melalui platform Re-Enviro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="overflow-hidden rounded-xl shadow-md cursor-pointer"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openPhoto(photo)}
            >
              <div className="relative h-64 overflow-hidden group">
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Modal untuk melihat foto */}
      {selectedPhoto && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closePhoto}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6" />
            </button>
            <motion.img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="mt-4 text-white text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-xl font-medium">{selectedPhoto.caption}</h3>
              <p className="text-gray-300 mt-2">{selectedPhoto.alt}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  )
}

export default PhotoGallery