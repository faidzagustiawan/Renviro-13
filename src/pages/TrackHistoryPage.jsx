import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiUsers, FiSearch, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'

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

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState('activities')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Filter data berdasarkan pencarian
  const filteredActivities = activitiesData.filter(activity => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const filteredDonations = donationsData.filter(donation => 
    donation.project.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Statistik
  const totalActivities = activitiesData.length
  const totalDonations = donationsData.reduce((acc, curr) => acc + parseInt(curr.amount.replace(/[^0-9]/g, '')), 0)
  const startDate = new Date(Math.min(...activitiesData.map(a => new Date(a.date)))).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
  
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
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Track History
            </h1>
            <p className="text-primary-100 max-w-3xl mx-auto text-lg mb-8 text-center">
              Pantau riwayat kontribusi Anda untuk lingkungan, termasuk kegiatan relawan dan donasi yang telah Anda berikan.
            </p>
            
            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{totalActivities}</h3>
                <p className="text-primary-100">Kegiatan Diikuti</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">Rp {(totalDonations).toLocaleString('id-ID')}</h3>
                <p className="text-primary-100">Total Donasi</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{startDate}</h3>
                <p className="text-primary-100">Bergabung Sejak</p>
              </div>
            </div>
            
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
                  placeholder="Cari aktivitas atau donasi..."
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
              <li>
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
            </ul>
          </div>
          
          {/* Tab Content - Kegiatan Relawan */}
          {activeTab === 'activities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end">
                      <div className="p-4">
                        <span className="px-2 py-1 bg-white/90 text-primary-800 text-xs font-medium rounded-full mb-2 inline-block">
                          Relawan
                        </span>
                        <h3 className="text-white font-semibold">{activity.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                        <FiCalendar className="mr-2 text-primary-600 dark:text-primary-400" />
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                        <FiMapPin className="mr-2 text-primary-600 dark:text-primary-400" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/ecoact/${activity.id}`}
                      className="w-full block text-center py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/10 transition-colors"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Tab Content - Donasi */}
          {activeTab === 'donations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.map((donation) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <img 
                      src={donation.image} 
                      alt={donation.project} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end">
                      <div className="p-4">
                        <span className="px-2 py-1 bg-white/90 text-primary-800 text-xs font-medium rounded-full mb-2 inline-block">
                          Donasi
                        </span>
                        <h3 className="text-white font-semibold">{donation.project}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                        <FiCalendar className="mr-2 text-primary-600 dark:text-primary-400" />
                        <span>{donation.date}</span>
                      </div>
                      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                        <FiClock className="mr-2 text-primary-600 dark:text-primary-400" />
                        <span>{donation.amount}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/dana-hijau/${donation.id}`}
                      className="w-full block text-center py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/10 transition-colors"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HistoryPage