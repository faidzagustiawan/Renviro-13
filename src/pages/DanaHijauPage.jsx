import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiCalendar, FiFilter, FiChevronDown, FiSearch, FiBarChart2, FiHeart } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

// Data proyek contoh
const projectsData = [
  {
    id: 1,
    title: 'Hutan Mangrove untuk Pesisir Lestari',
    location: 'Pesisir Utara, Jakarta',
    category: 'Konservasi Pesisir',
    targetFunding: 75000000,
    currentFunding: 58000000,
    deadline: '31 Mei 2025',
    daysLeft: 23,
    image: 'https://images.pexels.com/photos/533882/pexels-photo-533882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Proyek penanaman mangrove untuk menjaga ekosistem pesisir dan mencegah abrasi pantai di kawasan Pesisir Utara Jakarta.'
  },
  {
    id: 2,
    title: 'Penyediaan Air Bersih untuk Desa Terpencil',
    location: 'Desa Sukamaju, NTT',
    category: 'Air Bersih',
    targetFunding: 120000000,
    currentFunding: 45000000,
    deadline: '15 Juni 2025',
    daysLeft: 38,
    image: 'https://images.pexels.com/photos/3319445/pexels-photo-3319445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Pembangunan infrastruktur air bersih untuk mengatasi krisis air di desa terpencil di Nusa Tenggara Timur.'
  },
  {
    id: 3,
    title: 'Energi Surya untuk Sekolah Desa',
    location: 'Desa Cikalong, Jawa Barat',
    category: 'Energi Terbarukan',
    targetFunding: 85000000,
    currentFunding: 76000000,
    deadline: '10 Juni 2025',
    daysLeft: 33,
    image: 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Pemasangan panel surya untuk memenuhi kebutuhan listrik sekolah-sekolah di pedesaan yang belum terjangkau listrik.'
  },
  {
    id: 4,
    title: 'Pengelolaan Sampah Terpadu di Pasar Tradisional',
    location: 'Pasar Baru, Bandung',
    category: 'Pengelolaan Sampah',
    targetFunding: 60000000,
    currentFunding: 28000000,
    deadline: '25 Mei 2025',
    daysLeft: 17,
    image: 'https://images.pexels.com/photos/5340277/pexels-photo-5340277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Implementasi sistem pengelolaan sampah terpadu di pasar tradisional untuk mengurangi sampah yang terbuang ke TPA.'
  },
  {
    id: 5,
    title: 'Reboisasi Hutan Lindung Gunung Salak',
    location: 'Gunung Salak, Jawa Barat',
    category: 'Reboisasi',
    targetFunding: 150000000,
    currentFunding: 92000000,
    deadline: '20 Juni 2025',
    daysLeft: 43,
    image: 'https://images.pexels.com/photos/14928840/pexels-photo-14928840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Proyek reboisasi di kawasan hutan lindung Gunung Salak yang rusak akibat kebakaran hutan dan perambahan illegal.'
  },
  {
    id: 6,
    title: 'Sistem Peringatan Dini Bencana untuk Desa Rawan Banjir',
    location: 'Kabupaten Bojonegoro, Jawa Timur',
    category: 'Mitigasi Bencana',
    targetFunding: 110000000,
    currentFunding: 37000000,
    deadline: '5 Juni 2025',
    daysLeft: 28,
    image: 'https://images.pexels.com/photos/10529583/pexels-photo-10529583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Pemasangan sistem peringatan dini banjir berbasis teknologi untuk melindungi masyarakat desa yang berada di kawasan rawan banjir.'
  }
]

const ProjectCard = ({ project }) => {
  const progress = (project.currentFunding / project.targetFunding) * 100
  const formattedCurrentFunding = new Intl.NumberFormat('id-ID').format(project.currentFunding)
  const formattedTargetFunding = new Intl.NumberFormat('id-ID').format(project.targetFunding)
  
  return (
    <motion.div 
      className="card group hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className="text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <FiMapPin className="mr-1" />
            {project.location}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <FiCalendar className="mr-1" />
            {project.daysLeft} hari lagi
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FiBarChart2 className="mr-1" />
              <span>Terkumpul</span>
            </div>
            <span className="font-medium">{formattedCurrentFunding}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
          <div className="flex justify-end">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Target: Rp {formattedTargetFunding}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            to={`/dana-hijau/${project.id}`} 
            className="flex-grow py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg text-center transition-colors"
          >
            Donasi Sekarang
          </Link>
          <button 
            className="p-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            aria-label="Simpan ke favorit"
          >
            <FiHeart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const DanaHijauPage = () => {
  const [projects, setProjects] = useState(projectsData)
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    sort: 'newest'
  })
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    filterProjects(e.target.value, filters)
  }
  
  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    }
    setFilters(newFilters)
    filterProjects(searchTerm, newFilters)
  }
  
  const filterProjects = (search, filterOptions) => {
    let results = projectsData
    
    // Filter by search
    if (search) {
      results = results.filter(project => 
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.location.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Filter by category
    if (filterOptions.category) {
      results = results.filter(project => project.category === filterOptions.category)
    }
    
    // Sort projects
    switch (filterOptions.sort) {
      case 'newest':
        // No change needed as the data is already sorted by date
        break
      case 'mostFunded':
        results = [...results].sort((a, b) => b.currentFunding - a.currentFunding)
        break
      case 'endingSoon':
        results = [...results].sort((a, b) => a.daysLeft - b.daysLeft)
        break
      default:
        break
    }
    
    setFilteredProjects(results)
  }
  
  const resetFilters = () => {
    setSearchTerm('')
    setFilters({
      category: '',
      sort: 'newest'
    })
    setFilteredProjects(projectsData)
  }
  
  // Get unique categories
  const categories = [...new Set(projectsData.map(project => project.category))]
  
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative py-16 bg-primary-700 dark:bg-primary-800">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
            alt="Dana lingkungan" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dana Hijau - Pendanaan untuk Lingkungan
          </h1>
          <p className="text-primary-100 max-w-3xl mx-auto text-lg mb-8">
            Dukung proyek-proyek lingkungan yang inovatif dan berdampak. 
            Setiap rupiah yang Anda berikan akan digunakan untuk menciptakan perubahan positif bagi lingkungan dan komunitas lokal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#projects" className="btn bg-white text-primary-700 hover:bg-gray-100 hover:text-primary-800">
              Jelajahi Proyek
            </a>
            <Link to="/dana-hijau/submit" className="btn bg-accent-600 text-white hover:bg-accent-700">
              Ajukan Proyek
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <section className="py-10 bg-primary-50 dark:bg-primary-900/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                Rp 850 Juta+
              </div>
              <p className="text-gray-700 dark:text-gray-300">Total Dana Terkumpul</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                45+
              </div>
              <p className="text-gray-700 dark:text-gray-300">Proyek Berhasil Didanai</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                5.000+
              </div>
              <p className="text-gray-700 dark:text-gray-300">Pendana</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Listing */}
      <section id="projects" className="py-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
              Proyek yang Membutuhkan Pendanaan
            </h2>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
            >
              <FiFilter />
              Filter & Urutkan
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cari Proyek
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FiSearch className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="search"
                          value={searchTerm}
                          onChange={handleSearchChange}
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
                        {categories.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Urutkan
                      </label>
                      <select
                        id="sort"
                        value={filters.sort}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="newest">Terbaru</option>
                        <option value="mostFunded">Dana Terbanyak</option>
                        <option value="endingSoon">Segera Berakhir</option>
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
          
          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tidak ada proyek yang sesuai dengan filter Anda.
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
      
      {/* How it Works */}
      <section className="py-16 bg-primary-50 dark:bg-primary-900/20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">
              Bagaimana Dana Hijau Bekerja
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Dana Hijau memfasilitasi pendanaan proyek lingkungan secara transparan dan efektif. 
              Berikut cara kerjanya:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Pilih Proyek
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Jelajahi beragam proyek lingkungan yang telah diverifikasi oleh tim kami. Pilih proyek yang sesuai dengan minat dan nilai-nilai Anda.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Berikan Dukungan
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Donasikan nominal apapun yang Anda inginkan untuk mendukung proyek pilihan. Kami menerima berbagai metode pembayaran yang aman.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Pantau Dampak
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dapatkan update berkala tentang perkembangan proyek yang Anda dukung. Lihat bagaimana donasi Anda menciptakan dampak positif bagi lingkungan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">
              Kata Mereka Tentang Dana Hijau
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Dengarkan pengalaman dari para pendana dan pengelola proyek yang telah menggunakan platform Dana Hijau.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Yoga Pratama" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Yoga Pratama</h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400">Pendana</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Dana Hijau memudahkan saya untuk berkontribusi pada proyek-proyek lingkungan yang berdampak nyata. Saya sangat mengapresiasi transparansi dan laporan berkala yang diberikan sehingga saya tahu persis bagaimana dana saya digunakan."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Dina Fitriani" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Dina Fitriani</h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400">Pengelola Proyek</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Sebagai organisasi kecil yang fokus pada konservasi, kami kesulitan mendapatkan pendanaan. Dana Hijau memberikan platform yang tepat untuk menghubungkan kami dengan pendana yang memiliki visi yang sama. Proyek penanaman mangrove kami berhasil terdanai 100% berkat platform ini."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-700 dark:bg-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Mendukung Perubahan Positif?
          </h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8 text-lg">
            Bergabunglah dengan ribuan pendana lainnya dan dukung proyek-proyek lingkungan yang membuat perbedaan nyata di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#projects" className="btn bg-white text-primary-700 hover:bg-gray-100 hover:text-primary-800">
              Jelajahi Proyek
            </a>
            <Link to="/dana-hijau/about" className="btn border-2 border-white text-white hover:bg-white/10">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DanaHijauPage