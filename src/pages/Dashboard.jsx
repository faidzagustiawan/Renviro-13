import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  CheckCircle,
  Plus,
  TreePine,
  Leaf,
  Waves,
  Recycle,
  Heart,
  Award,
  Target,
  Globe
} from 'lucide-react';

// Sample data with environmental focus
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
    createdAt: '2025-01-15',
    impact: '2.5 ton sampah'
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
    createdAt: '2025-01-12',
    impact: '1000 pohon'
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
    createdAt: '2025-01-10',
    impact: '200 anak teredukasi'
  }
];

const sampleActivities = [
  { id: 1, type: 'event_created', user: 'Eco Admin', description: 'Membuat event "Bersihkan Pantai Kuta"', time: '2 jam yang lalu', icon: Waves, color: 'text-blue-600' },
  { id: 2, type: 'user_registered', user: 'John Doe', description: 'Bergabung sebagai volunteer untuk "Penanaman Pohon"', time: '4 jam yang lalu', icon: TreePine, color: 'text-green-600' },
  { id: 3, type: 'event_completed', user: 'System', description: 'Event "Workshop Daur Ulang" berhasil diselesaikan', time: '1 hari yang lalu', icon: Recycle, color: 'text-emerald-600' },
  { id: 4, type: 'donation_received', user: 'Jane Smith', description: 'Donasi Rp 500.000 untuk konservasi laut', time: '2 hari yang lalu', icon: Heart, color: 'text-pink-600' }
];

// Dashboard Components with Environmental Theme
const DashboardButton = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105';
  
  const variants = {
    primary: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white focus:ring-green-500 shadow-lg',
    secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-900 focus:ring-gray-500 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 dark:text-white',
    outline: 'border-2 border-green-300 hover:bg-green-50 text-green-700 focus:ring-green-500 dark:border-green-600 dark:hover:bg-green-900 dark:text-green-300',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-500',
    success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:ring-green-500'
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

const DashboardCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border border-green-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
};

const DashboardBadge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900 dark:to-emerald-900 dark:text-green-300',
    warning: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900 dark:to-orange-900 dark:text-yellow-300',
    danger: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 dark:from-red-900 dark:to-pink-900 dark:text-red-300',
    info: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900 dark:to-cyan-900 dark:text-blue-300'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const StatsCard = ({ title, value, change, changeType, icon: Icon, color, impact }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
    purple: 'from-purple-500 to-pink-500'
  };

  return (
    <DashboardCard className="p-5 relative overflow-hidden">
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <div className="flex items-center mt-1">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">{change}</span>
          </div>
          {impact && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
              🌱 {impact}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Environmental decoration */}
      <div className="absolute -bottom-1 -right-1 opacity-10">
        <Leaf className="w-12 h-12 text-green-500" />
      </div>
    </DashboardCard>
  );
};

const RecentEventsCard = ({ events }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { variant: 'success', label: 'Dipublikasi', icon: CheckCircle },
      draft: { variant: 'warning', label: 'Draft', icon: Calendar },
      completed: { variant: 'info', label: 'Selesai', icon: Award },
      cancelled: { variant: 'danger', label: 'Dibatalkan', icon: CheckCircle }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    const Icon = config.icon;
    
    return (
      <DashboardBadge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </DashboardBadge>
    );
  };

  return (
    <DashboardCard className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <TreePine className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Event Lingkungan Terbaru</h3>
        </div>
        <DashboardButton variant="outline" size="sm">
          Lihat Semua
        </DashboardButton>
      </div>
      <div className="space-y-3">
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-200 border border-green-100 dark:border-gray-600">
            <img
              src={event.image}
              alt={event.title}
              className="w-12 h-12 rounded-lg object-cover shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {event.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                {event.location}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                Impact: {event.impact}
              </p>
            </div>
            <div className="text-right">
              {getStatusBadge(event.status)}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

const ActivityFeedCard = ({ activities }) => {
  return (
    <DashboardCard className="p-5">
      <div className="flex items-center space-x-2 mb-5">
        <Waves className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aktivitas Lingkungan</h3>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-200">
              <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium text-green-700 dark:text-green-400">{activity.user}</span> {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
};

const QuickActionsCard = () => {
  return (
    <DashboardCard className="p-5">
      <div className="flex items-center space-x-2 mb-5">
        <Target className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aksi Cepat Lingkungan</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <DashboardButton className="flex items-center justify-center space-x-2 h-12">
          <Plus className="w-4 h-4" />
          <TreePine className="w-4 h-4" />
          <span>Buat Event Hijau</span>
        </DashboardButton>
        <DashboardButton variant="outline" className="flex items-center justify-center space-x-2 h-12">
          <Users className="w-4 h-4" />
          <Leaf className="w-4 h-4" />
          <span>Kelola Eco-Volunteers</span>
        </DashboardButton>
        <DashboardButton variant="outline" className="flex items-center justify-center space-x-2 h-12">
          <TrendingUp className="w-4 h-4" />
          <Globe className="w-4 h-4" />
          <span>Laporan Impact</span>
        </DashboardButton>
      </div>
    </DashboardCard>
  );
};

const EnvironmentalImpactCard = () => {
  return (
    <DashboardCard className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900">
      <div className="flex items-center space-x-2 mb-5">
        <Globe className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Impact Lingkungan Bulan Ini</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <TreePine className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-xl font-bold text-green-700 dark:text-green-400">2,450</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Pohon Ditanam</p>
        </div>
        
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Recycle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-xl font-bold text-blue-700 dark:text-blue-400">15.2</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Ton Sampah</p>
        </div>
        
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Waves className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
          <p className="text-xl font-bold text-cyan-700 dark:text-cyan-400">8</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Pantai Dibersihkan</p>
        </div>
        
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Heart className="w-6 h-6 text-pink-600 mx-auto mb-2" />
          <p className="text-xl font-bold text-pink-700 dark:text-pink-400">1,234</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Volunteer Aktif</p>
        </div>
      </div>
    </DashboardCard>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const stats = [
    {
      title: 'Total Event Hijau',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: TreePine,
      color: 'green',
      impact: '50+ lokasi terrestorasi'
    },
    {
      title: 'Eco Volunteers',
      value: '1,234',
      change: '+8%',
      changeType: 'increase',
      icon: Users,
      color: 'blue',
      impact: '15 kota di Indonesia'
    },
    {
      title: 'Dana Lingkungan',
      value: 'Rp 45.2M',
      change: '+15%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'yellow',
      impact: '25 proyek terdanai'
    },
    {
      title: 'Event Selesai',
      value: '18',
      change: '+5%',
      changeType: 'increase',
      icon: Award,
      color: 'purple',
      impact: '100% target tercapai'
    }
  ];

  return (
    <div className="space-y-5">
      {/* Welcome Section with Environmental Theme */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <Leaf className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Selamat Datang, Eco Admin! 🌱</h2>
          </div>
          <p className="text-green-100 mb-3">Kelola platform Re-Enviro untuk masa depan bumi yang lebih hijau dan berkelanjutan</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Platform Lingkungan #1 Indonesia</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span className="text-sm">1000+ Volunteer Aktif</span>
            </div>
          </div>
        </div>
        
        {/* Environmental decorations */}
        <div className="absolute top-2 right-6 opacity-20">
          <TreePine className="w-16 h-16" />
        </div>
        <div className="absolute bottom-2 right-16 opacity-20">
          <Waves className="w-12 h-12" />
        </div>
        <div className="absolute top-1/2 right-2 opacity-20">
          <Leaf className="w-8 h-8" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Environmental Impact Card */}
      <EnvironmentalImpactCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Events */}
        <RecentEventsCard events={sampleEvents} />

        {/* Activity Feed */}
        <ActivityFeedCard activities={sampleActivities} />
      </div>

      {/* Quick Actions */}
      <QuickActionsCard />
    </div>
  );
};

export default Dashboard;