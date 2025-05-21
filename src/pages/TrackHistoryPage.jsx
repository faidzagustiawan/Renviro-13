import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiUsers, FiCheckCircle, FiSearch } from 'react-icons/fi'

// Data aktivitas contoh
const activitiesData = [
  {
    id: 1,
    title: 'Bersihkan Pantai Kuta',
    date: '15 Januari 2025',
    location: 'Pantai Kuta, Bali',
    participants: 28,
    trashCollected: '125 kg',
    status: 'Selesai',
    image: 'https://images.pexels.com/photos/3519667/pexels-photo-3519667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 2,
    title: 'Penanaman Pohon di Gunung Gede',
    date: '22 Februari 2025',
    location: 'Gunung Gede, Jawa Barat',
    participants: 45,
    trees: 500,
    status: 'Selesai',
    image: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 3,
    title: 'Workshop Daur Ulang',
    date: '10 Maret 2025',
    location: 'SDN 03 Menteng, Jakarta',
    participants: 32,
    status: 'Selesai',
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  }
]

// Data donasi contoh
const donationsData = [
  {
    id: 1,
    project: 'Konservasi Terumbu Karang Kepulauan Seribu',
    date: '05 Januari 2025',
    amount: 'Rp 500.000',
    status: 'Berhasil',
    image: 'https://images.pexels.com/photos/3201922/pexels-photo-3201922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 2,
    project: 'Pengelolaan Sampah Terpadu di Pasar Baru',
    date: '18 Februari 2025',
    amount: 'Rp 750.000',
    status: 'Berhasil',
    image: 'https://images.pexels.com/photos/5340277/pexels-photo-5340277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  }
]

// Data sertifikat contoh
const certificatesData = [
  {
    id: 1,
    title: 'Sertifikat Partisipasi - Bersihkan Pantai Kuta',
    date: '15 Januari 2025',
    type: 'Relawan',
    image: 'https://images.pexels.com/photos/3519667/pexels-photo-3519667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 2,
    title: 'Sertifikat Donasi - Konservasi Terumbu Karang',
    date: '05 Januari 2025',
    type: 'Donasi',
    image: 'https://images.pexels.com/photos/3201922/pexels-photo-3201922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 3,
    title: 'Sertifikat Partisipasi - Penanaman Pohon di Gunung Gede',
    date: '22 Februari 2025',
    type: 'Relawan',
    image: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  }
]

const TrackHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('activities')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCertificate, setShowCertificate] = useState(null)
  
  // Filter data berdasarkan pencarian
  const filteredActivities = activitiesData.filter(activity => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const filteredDonations = donationsData.filter(donation => 
    donation.project.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const filteredCertificates = certificatesData.filter(certificate => 
    certificate.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative py-16 bg-primary-700 dark:bg-primary-800">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="https://images.pexels.com/photos/5748316/pexels-photo-5748316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
            alt="Hutan Indonesia" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Track History
            </h1>
            <p className="text-primary-100 max-w-3xl mx-auto text-lg mb-6">
              Pantau riwayat kontribusi Anda untuk lingkungan, termasuk kegiatan relawan, donasi, dan sertifikat yang Anda peroleh.
            </p>
            
            {/* Pencarian */}
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white/90 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Cari aktivitas, donasi, atau sertifikat..."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Tabs dan Konten */}
      <section className="py-16">
        <div className="container-custom">
          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button
                  onClick={() => setActiveTab('activities')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'activities'
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  Kegiatan Relawan
                </button>
              </li>
              <li className="mr-2">
                <button
                  onClick={() => setActiveTab('donations')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'donations'
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  Donasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'certificates'
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  Sertifikat
                </button>
              </li>
            </ul>
          </div>
          
          {/* Tab Content - Kegiatan Relawan */}
          {activeTab === 'activities' && (
            <div>
              {filteredActivities.length > 0 ? (
                <div className="space-y-6">
                  {filteredActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                    >
                      <div className="md:flex">
                        <div className="md:flex-shrink-0 md:w-48 h-48 md:h-auto">
                          <img 
                            src={activity.image} 
                            alt={activity.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {activity.title}
                              </h3>
                              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium rounded-full">
                                {activity.status}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                <FiCalendar className="mr-2 text-primary-600 dark:text-primary-400" />
                                <span>{activity.date}</span>
                              </div>
                              <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                <FiMapPin className="mr-2 text-primary-600 dark:text-primary-400" />
                                <span>{activity.location}</span>
                              </div>
                              <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                <FiUsers className="mr-2 text-primary-600 dark:text-primary-400" />
                                <span>{activity.participants} Relawan</span>
                              </div>
                            </div>
                            
                            <div>
                              {activity.trashCollected && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                  <strong>Sampah Terkumpul:</strong> {activity.trashCollected}
                                </p>
                              )}
                              
                              {activity.trees && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                  <strong>Pohon Tertanam:</strong> {activity.trees} pohon
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => setShowCertificate(certificatesData.find(cert => cert.title.includes(activity.title)))}
                              className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 focus:outline-none"
                            >
                              Lihat Sertifikat
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiCheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Belum Ada Kegiatan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Anda belum berpartisipasi dalam kegiatan relawan. Mari mulai berkontribusi!
                  </p>
                  <a 
                    href="/ecoact" 
                    className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm transition-colors"
                  >
                    Jelajahi Kegiatan
                  </a>
                </div>
              )}
            </div>
          )}
          
          {/* Tab Content - Donasi */}
          {activeTab === 'donations' && (
            <div>
              {filteredDonations.length > 0 ? (
                <div className="space-y-6">
                  {filteredDonations.map((donation) => (
                    <motion.div
                      key={donation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                    >
                      <div className="md:flex">
                        <div className="md:flex-shrink-0 md:w-48 h-48 md:h-auto">
                          <img 
                            src={donation.image} 
                            alt={donation.project} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {donation.project}
                              </h3>
                              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium rounded-full">
                                {donation.status}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                <FiCalendar className="mr-2 text-primary-600 dark:text-primary-400" />
                                <span>{donation.date}</span>
                              </div>
                              <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium">
                                Jumlah: {donation.amount}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => setShowCertificate(certificatesData.find(cert => cert.title.includes(donation.project)))}
                              className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 focus:outline-none"
                            >
                              Lihat Sertifikat
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiCheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Belum Ada Donasi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Anda belum memberikan donasi untuk proyek lingkungan. Dukung sekarang!
                  </p>
                  <a 
                    href="/dana-hijau" 
                    className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm transition-colors"
                  >
                    Jelajahi Proyek
                  </a>
                </div>
              )}
            </div>
          )}
          
          {/* Tab Content - Sertifikat */}
          {activeTab === 'certificates' && (
            <div>
              {filteredCertificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCertificates.map((certificate) => (
                    <motion.div
                      key={certificate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer"
                      onClick={() => setShowCertificate(certificate)}
                    >
                      <div className="relative h-48">
                        <img 
                          src={certificate.image} 
                          alt={certificate.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end">
                          <div className="p-4">
                            <span className="px-2 py-1 bg-white/90 text-primary-800 text-xs font-medium rounded-full mb-2 inline-block">
                              {certificate.type}
                            </span>
                            <h3 className="text-white font-semibold">{certificate.title}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm mb-3">
                          <FiCalendar className="mr-2 text-primary-600 dark:text-primary-400" />
                          <span>{certificate.date}</span>
                        </div>
                        <button 
                          className="w-full py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/10 transition-colors"
                        >
                          Lihat Sertifikat
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiCheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Belum Ada Sertifikat
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Anda belum mendapatkan sertifikat. Berpartisipasilah dalam kegiatan atau berikan donasi untuk mendapatkan sertifikat.
                  </p>
                  <div className="space-x-4">
                    <a 
                      href="/ecoact" 
                      className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm transition-colors"
                    >
                      Jelajahi Kegiatan
                    </a>
                    <a 
                      href="/dana-hijau" 
                      className="px-5 py-2.5 bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium rounded-lg text-sm transition-colors"
                    >
                      Jelajahi Proyek
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="relative bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg max-w-3xl w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-[url('https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')] bg-cover bg-center p-8 rounded-lg text-center">
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 rounded-lg"></div>
              
              <div className="relative">
                <div className="border-8 border-primary-100 dark:border-primary-900/50 p-8 rounded-lg">
                  <div className="mb-4">
                    <img 
                      src="/logo.svg" 
                      alt="Re-Enviro Logo" 
                      className="h-16 mx-auto"
                    />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-2">Sertifikat</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Diberikan kepada</p>
                  
                  <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Budi Santoso</h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Atas partisipasinya dalam<br />
                    <span className="font-semibold text-primary-700 dark:text-primary-300">{showCertificate.title.split(' - ')[1]}</span>
                  </p>
                  
                  <div className="mb-6">
                    <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{showCertificate.date}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">No. Sertifikat: RE{showCertificate.id}-{new Date().getFullYear()}</p>
                    </div>
                    
                    <div className="text-right">
                      <img 
                        src="https://via.placeholder.com/120x60?text=TTD" 
                        alt="Tanda Tangan" 
                        className="mb-1"
                      />
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Budi Santoso</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">CEO Re-Enviro</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setShowCertificate(null)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Tutup
                  </button>
                  
                  <button
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    Unduh Sertifikat
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default TrackHistoryPage