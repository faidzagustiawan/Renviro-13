import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiUsers, FiBarChart2, FiHeart, FiShare2, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { supabase } from '../services/supabaseClient'
import Swal from 'sweetalert2';



const DonationDetailPage = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [donationAmount, setDonationAmount] = useState('')
  const [showDonationModal, setShowDonationModal] = useState(false)


  const handleDonation = async () => {
    if (!donationAmount || Number(donationAmount) < 10000) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Minimal donasi adalah Rp10.000!',
      });
      return;
    }

    // 🔹 **Ambil data proyek dari database**
    const { data: refreshedProject, error: refreshError } = await supabase
      .from('projects')
      .select('current_funding')
      .eq('id', project.id)
      .single();

    if (refreshError) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal mengambil ulang data proyek.',
      });
      return;
    }

    // 🔹 **Tampilkan notifikasi sukses dengan jumlah current_funding terbaru**
    Swal.fire({
      icon: 'success',
      title: 'Donasi Berhasil!',
      text: `Dana proyek saat ini adalah Rp${refreshedProject.current_funding}`,
    });

    // 🔹 **Perbarui tampilan UI**
    setShowDonationModal(false);
    setDonationAmount('');
    setProject({ ...project, current_funding: refreshedProject.current_funding });
  };

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setLoading(true)

      const { data: project, error } = await supabase
        .from('projects')
        .select(`*, 
        project_impacts(impact), 
        project_timelines(id, phase, duration, project_timeline_activities(activity)), 
        project_gallery(image_url), 
        organizers(name, logo, description, experience, projects, volunteers)
      `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching project:', error)
        setProject(null)
      } else {
        setProject({
          ...project,
          impact: project.project_impacts?.map(i => i.impact) || [],
          timeline: project.project_timelines?.map(t => ({
            phase: t.phase,
            duration: t.duration,
            activities: t.project_timeline_activities?.map(a => a.activity) || []
          })) || [],
          gallery: project.project_gallery?.map(img => img.image_url) || [],
          organizer: project.organizers || {}
        })
      }

      setLoading(false)
    }

    fetchProjectDetail()
  }, [id])


  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Proyek Tidak Ditemukan</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Maaf, proyek yang Anda cari tidak ditemukan.</p>
        <Link to="/dana-hijau" className="btn-primary">
          Kembali ke Daftar Proyek
        </Link>
      </div>
    )
  }

  const progress = project.target_funding > 0
    ? (project.current_funding / project.target_funding) * 100
    : 0

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex py-3 mb-6 text-gray-600 dark:text-gray-400">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Beranda</Link>
            </li>
            <li>
              <div className="flex items-center">
                <FiChevronRight className="w-4 h-4" />
                <Link to="/dana-hijau" className="ml-1 hover:text-primary-600 dark:hover:text-primary-400">Dana Hijau</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <FiChevronRight className="w-4 h-4" />
                <span className="ml-1 text-gray-500 dark:text-gray-400" aria-current="page">{project.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiCalendar className="mr-2 text-primary-600 dark:text-primary-400" />
                  <span>Deadline: {project.deadline}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiMapPin className="mr-2 text-primary-600 dark:text-primary-400" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiUsers className="mr-2 text-primary-600 dark:text-primary-400" />
                  <span>{project.daysLeft} hari tersisa</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Tentang Proyek
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Dampak yang Diharap
                </h2>
                <ul className="space-y-2">
                  {project.impact.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 bg-primary-600 dark:bg-primary-400 rounded-full"></span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Timeline Proyek
                </h2>
                <div className="space-y-6">
                  {project.timeline.map((phase, index) => (
                    <div key={index} className="relative pl-8 pb-8 last:pb-0">
                      <div className="absolute left-0 top-0 w-px h-full bg-primary-200 dark:bg-primary-800"></div>
                      <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {phase.phase}
                        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                          ({phase.duration})
                        </span>
                      </h3>
                      <ul className="space-y-1">
                        {phase.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-gray-700 dark:text-gray-300">
                            • {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Galeri Proyek
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Gambar proyek ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Penyelenggara
                </h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <div className="flex items-start">
                    <img
                      src={project.organizer.logo}
                      alt={project.organizer.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {project.organizer.name}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {project.organizer.description}
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Pengalaman</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {project.organizer.experience}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Proyek</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {project.organizer.projects}+
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Relawan</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {project.organizer.volunteers}+
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-28"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Informasi Pendanaan
                </h3>

                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FiBarChart2 className="mr-1" />
                      <span>Terkumpul</span>
                    </div>
                    <span className="font-medium">
                      Rp {(Number(project.current_funding) || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Target: Rp {(Number(project.target_funding) || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowDonationModal(true)}
                  className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  Donasi Sekarang
                </button>

                <div className="flex justify-between mt-4">
                  <button className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    <FiHeart className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    <FiShare2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Bagikan Proyek Ini
                </h3>

                <div className="flex space-x-3 justify-center">
                  <a
                    href="#"
                    className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                    aria-label="Share via Email"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Donasi untuk {project.title}
            </h3>

            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Jumlah Donasi
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">
                  Rp
                </span>
                <input
                  type="number"
                  id="amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="block w-full pl-12 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0"
                  min="10000"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleDonation}
                className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-center transition-colors"
              >
                Lanjutkan Pembayaran
              </button>

              <button
                onClick={() => setShowDonationModal(false)}
                className="w-full py-2.5 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
              >
                Batal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default DonationDetailPage