import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Filter, 
  Eye, 
  Download,
  TrendingUp,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Banknote
} from 'lucide-react';

// Sample data
const sampleDonations = [
  {
    id: 1,
    donorName: 'John Doe',
    donorEmail: 'john.doe@email.com',
    amount: 500000,
    eventTitle: 'Bersihkan Pantai Kuta dari Sampah Plastik',
    eventId: 1,
    paymentMethod: 'credit_card',
    status: 'completed',
    date: '2025-01-20',
    transactionId: 'TXN-001-2025'
  },
  {
    id: 2,
    donorName: 'Jane Smith',
    donorEmail: 'jane.smith@email.com',
    amount: 1000000,
    eventTitle: 'Penanaman 1000 Pohon di Kawasan Gunung Gede',
    eventId: 2,
    paymentMethod: 'bank_transfer',
    status: 'completed',
    date: '2025-01-18',
    transactionId: 'TXN-002-2025'
  },
  {
    id: 3,
    donorName: 'Ahmad Rahman',
    donorEmail: 'ahmad.rahman@email.com',
    amount: 250000,
    eventTitle: 'Pembersihan Sungai Ciliwung',
    eventId: 4,
    paymentMethod: 'e_wallet',
    status: 'pending',
    date: '2025-01-19',
    transactionId: 'TXN-003-2025'
  },
  {
    id: 4,
    donorName: 'Sarah Wilson',
    donorEmail: 'sarah.wilson@email.com',
    amount: 750000,
    eventTitle: 'Konservasi Terumbu Karang Bunaken',
    eventId: 5,
    paymentMethod: 'credit_card',
    status: 'completed',
    date: '2025-01-17',
    transactionId: 'TXN-004-2025'
  },
  {
    id: 5,
    donorName: 'Michael Chen',
    donorEmail: 'michael.chen@email.com',
    amount: 300000,
    eventTitle: 'Bersihkan Pantai Kuta dari Sampah Plastik',
    eventId: 1,
    paymentMethod: 'bank_transfer',
    status: 'failed',
    date: '2025-01-16',
    transactionId: 'TXN-005-2025'
  },
  {
    id: 6,
    donorName: 'Lisa Anderson',
    donorEmail: 'lisa.anderson@email.com',
    amount: 2000000,
    eventTitle: 'Penanaman 1000 Pohon di Kawasan Gunung Gede',
    eventId: 2,
    paymentMethod: 'credit_card',
    status: 'completed',
    date: '2025-01-15',
    transactionId: 'TXN-006-2025'
  }
];

// Donations Components
const DonationsButton = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button', ...props }) => {
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

const DonationsCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

const DonationsBadge = ({ children, variant = 'default', className = '' }) => {
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

const DonationsSelect = ({ label, error, children, className = '', ...props }) => {
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

const DonationsStatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <DonationsCard className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </DonationsCard>
  );
};

const DonationsFiltersCard = ({ 
  searchTerm, 
  setSearchTerm, 
  showFilters, 
  setShowFilters, 
  statusFilter, 
  setStatusFilter, 
  paymentMethodFilter, 
  setPaymentMethodFilter, 
  dateFilter, 
  setDateFilter 
}) => {
  return (
    <DonationsCard className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari donasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <DonationsButton
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </DonationsButton>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <DonationsSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="completed">Berhasil</option>
              <option value="pending">Pending</option>
              <option value="failed">Gagal</option>
            </DonationsSelect>
            <DonationsSelect
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
            >
              <option value="">Semua Metode</option>
              <option value="credit_card">Kartu Kredit</option>
              <option value="bank_transfer">Transfer Bank</option>
              <option value="e_wallet">E-Wallet</option>
            </DonationsSelect>
            <input
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <DonationsButton
              variant="outline"
              onClick={() => {
                setStatusFilter('');
                setPaymentMethodFilter('');
                setDateFilter('');
                setSearchTerm('');
              }}
            >
              Reset Filter
            </DonationsButton>
          </div>
        </div>
      )}
    </DonationsCard>
  );
};

// Main Donations Component
const Donations = () => {
  const [donations, setDonations] = useState(sampleDonations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || donation.status === statusFilter;
    const matchesPaymentMethod = !paymentMethodFilter || donation.paymentMethod === paymentMethodFilter;
    const matchesDate = !dateFilter || donation.date.includes(dateFilter);
    
    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDate;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { variant: 'success', label: 'Berhasil', icon: CheckCircle },
      pending: { variant: 'warning', label: 'Pending', icon: Clock },
      failed: { variant: 'danger', label: 'Gagal', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <DonationsBadge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </DonationsBadge>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methodConfig = {
      credit_card: { variant: 'info', label: 'Kartu Kredit', icon: CreditCard },
      bank_transfer: { variant: 'default', label: 'Transfer Bank', icon: Banknote },
      e_wallet: { variant: 'success', label: 'E-Wallet', icon: DollarSign }
    };
    
    const config = methodConfig[method] || methodConfig.credit_card;
    const Icon = config.icon;
    
    return (
      <DonationsBadge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </DonationsBadge>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const donationStats = {
    total: donations.reduce((sum, donation) => sum + (donation.status === 'completed' ? donation.amount : 0), 0),
    count: donations.length,
    completed: donations.filter(d => d.status === 'completed').length,
    pending: donations.filter(d => d.status === 'pending').length,
    thisMonth: donations.filter(d => {
      const donationDate = new Date(d.date);
      const now = new Date();
      return donationDate.getMonth() === now.getMonth() && 
             donationDate.getFullYear() === now.getFullYear() &&
             d.status === 'completed';
    }).reduce((sum, donation) => sum + donation.amount, 0)
  };

  const handleExportData = () => {
    console.log('Exporting donation data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Donasi</h2>
          <p className="text-gray-600 dark:text-gray-400">Kelola semua donasi untuk event lingkungan</p>
        </div>
        <DonationsButton onClick={handleExportData} className="mt-4 sm:mt-0">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </DonationsButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DonationsStatsCard 
          title="Total Donasi" 
          value={formatCurrency(donationStats.total)} 
          icon={DollarSign} 
          color="text-green-500" 
        />
        <DonationsStatsCard 
          title="Jumlah Transaksi" 
          value={donationStats.count} 
          icon={TrendingUp} 
          color="text-blue-500" 
        />
        <DonationsStatsCard 
          title="Berhasil" 
          value={donationStats.completed} 
          icon={CheckCircle} 
          color="text-green-500" 
        />
        <DonationsStatsCard 
          title="Bulan Ini" 
          value={formatCurrency(donationStats.thisMonth)} 
          icon={Calendar} 
          color="text-purple-500" 
        />
      </div>

      {/* Filters and Search */}
      <DonationsFiltersCard 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentMethodFilter={paymentMethodFilter}
        setPaymentMethodFilter={setPaymentMethodFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      {/* Donations Table */}
      <DonationsCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Donatur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Metode Pembayaran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID Transaksi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {donation.donorName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {donation.donorEmail}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                      {donation.eventTitle}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(donation.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getPaymentMethodBadge(donation.paymentMethod)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(donation.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(donation.date).toLocaleDateString('id-ID')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                      {donation.transactionId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <DonationsButton variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </DonationsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada donasi yang ditemukan</p>
          </div>
        )}
      </DonationsCard>
    </div>
  );
};

export default Donations;