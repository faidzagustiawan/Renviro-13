import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiUsers, FiClock, FiChevronRight, FiCheck, FiAlertTriangle } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { supabase } from '../services/supabaseClient'


const RegisterForm = ({ eventId, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user?.id) setUserId(data.user.id)
      else setStatusMessage('Silakan login terlebih dahulu.')
    }
    fetchUser()
  }, [])

  const handleRegister = async () => {
    if (!userId) return

    setLoading(true)
    setStatusMessage('')

    const { error } = await supabase.from('event_registrations').insert([
      {
        event_id: eventId,
        user_id: userId,
        status: 'pending'
      }
    ])

    setLoading(false)
    if (error) {
      console.error(error)
      setStatusMessage('Gagal mendaftar. Coba lagi.')
    } else {
      setStatusMessage('Berhasil mendaftar! 🎉')
    }
  }

  return (
    <>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Klik tombol di bawah untuk mendaftar event ini.
      </p>

      <button
        onClick={handleRegister}
        disabled={loading || !userId}
        className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg"
      >
        {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
      </button>

      {statusMessage && (
        <p className="mt-4 text-sm text-center text-primary-600 dark:text-primary-400">{statusMessage}</p>
      )}

      <button
        onClick={onClose}
        className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
      >
        Tutup
      </button>
    </>
  )
}

const EventDetailPage = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          organizers (
            name,
            logo,
            description
          ),
          event_gallery (
            image_url
          ),
          event_requirements (
            requirement
          ),
          event_provided (
            item
          )
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('Gagal memuat event:', error)
      } else {
        setEvent(data)
      }

      setLoading(false)
    }

    fetchEvent()
  }, [id])

  const handleRegister = () => {
    setRegisterModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Kegiatan Tidak Ditemukan</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Maaf, kegiatan yang Anda cari tidak ditemukan.</p>
        <Link to="/ecoact" className="btn-primary">
          Kembali ke Daftar Kegiatan
        </Link>
      </div>
    )
  }

  const progress = (event.registered / event.quota) * 100

  const fundingTypeClass = {
    'Fully-funded': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'Half-funded': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'Self-funded': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex py-3 mb-6 text-gray-600 dark:text-gray-400">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Beranda</Link></li>
            <li className="flex items-center">
              <FiChevronRight className="w-4 h-4" />
              <Link to="/ecoact" className="ml-1 hover:text-primary-600 dark:hover:text-primary-400">EcoAct</Link>
            </li>
            <li className="flex items-center">
              <FiChevronRight className="w-4 h-4" />
              <span className="ml-1 text-gray-500 dark:text-gray-400">{event.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Konten Utama */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <img src={event.image} alt={event.title} className="w-full h-auto object-cover rounded-xl mb-6" />

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${fundingTypeClass[event.funding_type]}`}>
                  {event.funding_type}
                </span>
                <span className="text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-2.5 py-1 rounded-full">
                  {event.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{event.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-gray-700 dark:text-gray-300">
                <div><FiCalendar className="inline mr-2 text-primary-600" />{event.date}</div>
                <div><FiClock className="inline mr-2 text-primary-600" />{event.time}</div>
                <div><FiMapPin className="inline mr-2 text-primary-600" />{event.location}</div>
              </div>

              <div className="border-t pt-6 mb-6 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-2">Tentang Kegiatan</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Persyaratan</h3>
                  <ul className="space-y-2">
                    {event.event_requirements.map((req, i) => (
                      <li key={i} className="flex"><FiCheck className="mr-2 mt-1 text-primary-600" />{req.requirement}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Disediakan</h3>
                  <ul className="space-y-2">
                    {event.event_provided.map((item, i) => (
                      <li key={i} className="flex"><FiCheck className="mr-2 mt-1 text-primary-600" />{item.item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Galeri</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {event.event_gallery.map((img, i) => (
                  <img key={i} src={img.image_url} className="rounded-xl object-cover w-full h-48" alt={`Gallery ${i}`} />
                ))}
              </div>

              <div className="border-t pt-6 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Penyelenggara</h3>
                <div className="flex items-center">
                  <img src={event.organizers.logo} className="w-14 h-14 rounded-full mr-4" alt={event.organizers.name} />
                  <div>
                    <h4 className="font-bold">{event.organizers.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{event.organizers.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div className="sticky top-28" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 mb-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Informasi Pendaftaran</h3>
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-700 dark:text-gray-300"><FiUsers className="inline mr-1" /> Kuota</span>
                    <span>{event.registered}/{event.quota}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                {/* Info Pendanaan */}
                {event.funding_type === 'Half-funded' && (
                  <div className="p-3 mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md">
                    <FiAlertTriangle className="inline text-yellow-600 mr-2" />
                    Relawan menanggung sebagian biaya.
                  </div>
                )}
                {event.funding_type === 'Self-funded' && (
                  <div className="p-3 mb-4 bg-gray-100 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 rounded-md">
                    <FiAlertTriangle className="inline text-gray-600 mr-2" />
                    Biaya ditanggung sendiri.
                  </div>
                )}

                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg"
                >
                  Daftar Sekarang
                </button>



                <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
                  Pendaftaran ditutup pada {event.registration_deadline || '-'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pendaftaran Event</h3>

            <RegisterForm eventId={event.id} onClose={() => setShowRegisterModal(false)} />
          </div>
        </div>
      )}

    </div>

  )
}

export default EventDetailPage
