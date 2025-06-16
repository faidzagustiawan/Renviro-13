import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

// Sample data
const sampleEvents = [
  {
    id: 1,
    title: 'Bersihkan Pantai Kuta dari Sampah Plastik',
    location: 'Pantai Kuta, Bali',
    date: '2025-05-10',
    category: 'Pembersihan Pantai',
    status: 'published',
    participants: 25,
    maxParticipants: 30,
    fundingType: 'fully-funded',
    fundingAmount: 5000000,
    image: 'https://images.pexels.com/photos/3519667/pexels-photo-3519667.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2025-01-15'
  },
  {
    id: 2,
    title: 'Penanaman 1000 Pohon di Kawasan Gunung Gede',
    location: 'Gunung Gede, Jawa Barat',
    date: '2025-05-15',
    category: 'Reboisasi',
    status: 'draft',
    participants: 42,
    maxParticipants: 50,
    fundingType: 'half-funded',
    fundingAmount: 3000000,
    image: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2025-01-12'
  },
  {
    id: 3,
    title: 'Workshop Daur Ulang untuk Anak Sekolah',
    location: 'SDN 03 Menteng, Jakarta',
    date: '2025-05-20',
    category: 'Edukasi',
    status: 'completed',
    participants: 15,
    maxParticipants: 20,
    fundingType: 'self-funded',
    fundingAmount: 0,
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2025-01-10'
  },
  {
    id: 4,
    title: 'Pembersihan Sungai Ciliwung',
    location: 'Jakarta Pusat',
    date: '2025-05-25',
    category: 'Pembersihan Sungai',
    status: 'published',
    participants: 18,
    maxParticipants: 25,
    fundingType: 'half-funded',
    fundingAmount: 2500000,
    image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2025-01-08'
  },
  {
    id: 5,
    title: 'Konservasi Terumbu Karang Bunaken',
    location: 'Bunaken, Sulawesi Utara',
    date: '2025-06-01',
    category: 'Konservasi Laut',
    status: 'draft',
    participants: 8,
    maxParticipants: 15,
    fundingType: 'fully-funded',
    fundingAmount: 8000000,
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2025-01-05'
  }
];

// Events Components
const EventsButton = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const EventsCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

const EventsBadge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const EventsSelect = ({ label, error, children, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

const EventsStatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <EventsCard className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </EventsCard>
  );
};

const EventsFiltersCard = ({ 
  searchTerm, 
  setSearchTerm, 
  showFilters, 
  setShowFilters, 
  statusFilter, 
  setStatusFilter, 
  categoryFilter, 
  setCategoryFilter, 
  selectedEvents 
}) => {
  return (
    <EventsCard className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <EventsButton
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </EventsButton>
        </div>

        {selectedEvents.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedEvents.length} dipilih
            </span>
            <EventsButton variant="outline" size="sm">
              Publikasikan
            </EventsButton>
            <EventsButton variant="outline" size="sm">
              Jadikan Draft
            </EventsButton>
            <EventsButton variant="danger" size="sm">
              Hapus
            </EventsButton>
          </div>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EventsSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="published">Dipublikasi</option>
              <option value="draft">Draft</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </EventsSelect>
            <EventsSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              <option value="Pembersihan Pantai">Pembersihan Pantai</option>
              <option value="Reboisasi">Reboisasi</option>
              <option value="Edukasi">Edukasi</option>
              <option value="Konservasi Air">Konservasi Air</option>
              <option value="Pembersihan Sungai">Pembersihan Sungai</option>
              <option value="Konservasi Laut">Konservasi Laut</option>
            </EventsSelect>
            <EventsButton
              variant="outline"
              onClick={() => {
                setStatusFilter('');
                setCategoryFilter('');
                setSearchTerm('');
              }}
            >
              Reset Filter
            </EventsButton>
          </div>
        </div>
      )}
    </EventsCard>
  );
};

// Main Events Component
const Events = ({ onCreateEvent }) => {
  const [events, setEvents] = useState(sampleEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || event.status === statusFilter;
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectEvent = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEvents(
      selectedEvents.length === filteredEvents.length 
        ? [] 
        : filteredEvents.map(event => event.id)
    );
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus event ini?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { variant: 'success', label: 'Dipublikasi', icon: CheckCircle },
      draft: { variant: 'warning', label: 'Draft', icon: Clock },
      completed: { variant: 'info', label: 'Selesai', icon: CheckCircle },
      cancelled: { variant: 'danger', label: 'Dibatalkan', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    const Icon = config.icon;
    
    return (
      <EventsBadge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </EventsBadge>
    );
  };

  const eventStats = {
    total: events.length,
    published: events.filter(e => e.status === 'published').length,
    draft: events.filter(e => e.status === 'draft').length,
    completed: events.filter(e => e.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Event</h2>
          <p className="text-gray-600 dark:text-gray-400">Kelola semua event lingkungan di platform</p>
        </div>
        <EventsButton onClick={onCreateEvent} className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Buat Event Baru
        </EventsButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <EventsStatsCard title="Total Event" value={eventStats.total} icon={Calendar} color="text-blue-500" />
        <EventsStatsCard title="Dipublikasi" value={eventStats.published} icon={CheckCircle} color="text-green-500" />
        <EventsStatsCard title="Draft" value={eventStats.draft} icon={Clock} color="text-yellow-500" />
        <EventsStatsCard title="Selesai" value={eventStats.completed} icon={CheckCircle} color="text-blue-500" />
      </div>

      {/* Filters and Search */}
      <EventsFiltersCard 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        selectedEvents={selectedEvents}
      />

      {/* Events Table */}
      <EventsCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Peserta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => handleSelectEvent(event.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <EventsBadge variant="default">{event.category}</EventsBadge>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(event.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {event.participants}/{event.maxParticipants}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(event.date).toLocaleDateString('id-ID')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <EventsButton variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </EventsButton>
                      <EventsButton variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </EventsButton>
                      <EventsButton
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </EventsButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada event yang ditemukan</p>
          </div>
        )}
      </EventsCard>
    </div>
  );
};

export default Events;