import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiUsers, FiFilter, FiChevronDown, FiSearch } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

// Data acara contoh
const eventsData = [
  {
    id: 1,
    title: 'Bersihkan Pantai Kuta dari Sampah Plastik',
    location: 'Pantai Kuta, Bali',
    date: '10 Mei 2025',
    category: 'Pembersihan Pantai',
    fundingType: 'Fully-funded',
    quota: 30,
    registered: 25,
    image: 'https://images.pexels.com/photos/3519667/pexels-photo-3519667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Bergabunglah dalam upaya membersihkan Pantai Kuta dari sampah plastik yang mencemari keindahan pantai dan membahayakan ekosistem laut.'
  },
  {
    id: 2,
    title: 'Penanaman 1000 Pohon di Kawasan Gunung Gede',
    location: 'Gunung Gede, Jawa Barat',
    date: '15 Mei 2025',
    category: 'Reboisasi',
    fundingType: 'Half-funded',
    quota: 50,
    registered: 42,
    image: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Ikut serta dalam kegiatan penanaman 1000 pohon untuk menghijaukan kembali kawasan Gunung Gede yang terdampak kebakaran hutan.'
  },
  {
    id: 3,
    title: 'Workshop Daur Ulang untuk Anak Sekolah',
    location: 'SDN 03 Menteng, Jakarta',
    date: '20 Mei 2025',
    category: 'Edukasi',
    fundingType: 'Self-funded',
    quota: 20,
    registered: 15,
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Workshop interaktif untuk mengajarkan anak-anak sekolah dasar tentang pentingnya daur ulang dan cara membuat kreasi dari sampah.'
  },
  {
    id: 4,
    title: 'Pembuatan Biopori untuk Konservasi Air',
    location: 'Taman Kota, Bandung',
    date: '25 Mei 2025',
    category: 'Konservasi Air',
    fundingType: 'Fully-funded',
    quota: 25,
    registered: 18,
    image: 'https://images.pexels.com/photos/8460348/pexels-photo-8460348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Pembuatan lubang biopori di area taman kota untuk membantu penyerapan air hujan dan mencegah banjir di Kota Bandung.'
  },
  {
    id: 5,
    title: 'Pembersihan Sungai Ciliwung',
    location: 'Sungai Ciliwung, Jakarta',
    date: '1 Juni 2025',
    category: 'Pembersihan Sungai',
    fundingType: 'Half-funded',
    quota: 40,
    registered: 28,
    image: 'https://images.pexels.com/photos/12819795/pexels-photo-12819795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Kegiatan membersihkan sampah di Sungai Ciliwung untuk mengurangi pencemaran dan mencegah banjir di Jakarta.'
  },
  {
    id: 6,
    title: 'Tanam Terumbu Karang di Kepulauan Seribu',
    location: 'Kepulauan Seribu, Jakarta',
    date: '5 Juni 2025',
    category: 'Konservasi Laut',
    fundingType: 'Self-funded',
    quota: 15,
    registered: 10,
    image: 'https://images.pexels.com/photos/3201922/pexels-photo-3201922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Bergabunglah dalam kegiatan penanaman terumbu karang untuk merehabilitasi ekosistem laut di Kepulauan Seribu.'
  }
]

const EventCard = ({ event }) => {
  const progress = (event.registered / event.quota) * 100
  
  const fundingTypeClass = {
    'Fully-funded': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-100',
    'Half-funded': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-100',
    'Self-funded': 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-100'
  }
  
  return (
    <motion.div 
      className="card group hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${fundingTypeClass[event.fundingType]}`}>
            {event.fundingType}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-2.5 py-1 rounded-full">
            {event.category}
          </span>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <FiCalendar className="mr-1" />
            {event.date}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
          <FiMapPin className="mr-1" />
          {event.location}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FiUsers className="mr-1" />
              <span>Kuota Relawan</span>
            </div>
            <span className="font-medium">{event.registered}/{event.quota}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
        </div>
        
        <Link 
          to={`/ecoact/${event.id}`} 
          className="w-full block text-center py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Bergabung Sekarang
        </Link>
      </div>
    </motion.div>
  )
}

const EcoActPage = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    fundingType: '',
    location: ''
  })
  
  // Memuat data acara
  useEffect(() => {
    setEvents(eventsData)
    setFilteredEvents(eventsData)
  }, [])
  
  // Filter acara berdasarkan pencarian dan filter
  useEffect(() => {
    let results = events
    
    // Filter berdasarkan pencarian
    if (searchTerm) {
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filter berdasarkan kategori
    if (filters.category) {
      results = results.filter(event => event.category === filters.category)
    }
    
    // Filter berdasarkan tipe pendanaan
    if (filters.fundingType) {
      results = results.filter(event => event.fundingType === filters.fundingType)
    }
    
    // Filter berdasarkan lokasi
    if (filters.location) {
      results = results.filter(event => event.location.includes(filters.location))
    }
    
    setFilteredEvents(results)
  }, [searchTerm, filters, events])
  
  // Mendapatkan opsi unik untuk dropdown filter
  const getUniqueValues = (key) => {
    return [...new Set(events.map(event => event[key]))]
  }
  
  // Mengatur filter
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  // Reset filter
  const resetFilters = () => {
    setFilters({
      category: '',
      fundingType: '',
      location: ''
    })
    setSearchTerm('')
  }
  
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative py-16 bg-primary-700 dark:bg-primary-800">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="https://images.pexels.com/photos/5748320/pexels-photo-5748320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
            alt="Relawan lingkungan" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            EcoAct - Aksi Nyata untuk Lingkungan
          </h1>
          <p className="text-primary-100 max-w-3xl mx-auto text-lg mb-8">
            Temukan dan bergabunglah dalam berbagai kegiatan relawan lingkungan di seluruh Indonesia. 
            Dari penanaman pohon hingga edukasi lingkungan, setiap aksi kecil membawa dampak besar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#events" className="btn bg-white text-primary-700 hover:bg-gray-100 hover:text-primary-800">
              Jelajahi Kegiatan
            </a>
            <Link to="/signup" className="btn bg-accent-600 text-white hover:bg-accent-700">
              Bergabung Sekarang
            </Link>
          </div>
        </div>
      </div>
      
      {/* Event Listing */}
      <section id="events" className="py-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
              Kegiatan yang Tersedia
            </h2>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
            >
              <FiFilter />
              Filter
              <FiChevronDown className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Search and Filter */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cari Kegiatan
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FiSearch className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Cari berdasarkan nama atau lokasi"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Kategori
                      </label>
                      <select
                        id="category"
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Semua Kategori</option>
                        {getUniqueValues('category').map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="fundingType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tipe Pendanaan
                      </label>
                      <select
                        id="fundingType"
                        value={filters.fundingType}
                        onChange={(e) => handleFilterChange('fundingType', e.target.value)}
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Semua Tipe</option>
                        {getUniqueValues('fundingType').map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Lokasi
                      </label>
                      <select
                        id="location"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Semua Lokasi</option>
                        <option value="Jakarta">Jakarta</option>
                        <option value="Bali">Bali</option>
                        <option value="Bandung">Bandung</option>
                        <option value="Surabaya">Surabaya</option>
                        <option value="Yogyakarta">Yogyakarta</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tidak ada kegiatan yang sesuai dengan filter Anda.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 btn-primary"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-50 dark:bg-primary-900/20">
        <div className="container-custom">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ingin Mengadakan Kegiatan Relawan?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Kami terbuka untuk kolaborasi dengan komunitas, organisasi, dan perusahaan yang ingin mengadakan kegiatan relawan lingkungan. Hubungi kami untuk mendiskusikan kolaborasi!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#" className="btn-primary">
                    Ajukan Kegiatan
                  </a>
                  <a href="#" className="btn-outline">
                    Pelajari Lebih Lanjut
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Kolaborasi lingkungan" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EcoActPage