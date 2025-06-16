import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Database,
  Mail,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

// Settings Components
const SettingsButton = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button', ...props }) => {
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

const SettingsInput = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

const SettingsSelect = ({ label, error, children, className = '', ...props }) => {
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

const SettingsTextArea = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

const SettingsCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

const SettingsToggle = ({ label, description, checked, onChange, className = '' }) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
        }`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

const SettingsSidebar = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <SettingsCard className="p-4">
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </SettingsCard>
  );
};

// Main Settings Component
const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Profile Settings
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@re-enviro.com',
    phone: '08123456789',
    bio: 'Administrator platform Re-Enviro',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    donationAlerts: true,
    weeklyReports: false,
    marketingEmails: false
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Re-Enviro',
    siteDescription: 'Platform volunteer lingkungan Indonesia',
    contactEmail: 'contact@re-enviro.com',
    supportEmail: 'support@re-enviro.com',
    maxEventParticipants: 100,
    autoApproveEvents: false,
    maintenanceMode: false
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'id',
    timezone: 'Asia/Jakarta',
    dateFormat: 'dd/mm/yyyy'
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'system', label: 'Sistem', icon: Database },
    { id: 'appearance', label: 'Tampilan', icon: Palette }
  ];

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile updated:', profileData);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Notification settings updated:', notificationSettings);
      alert('Pengaturan notifikasi berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSystemSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('System settings updated:', systemSettings);
      alert('Pengaturan sistem berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating system settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppearanceSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Appearance settings updated:', appearanceSettings);
      alert('Pengaturan tampilan berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating appearance settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileTab = () => (
    <form onSubmit={handleProfileSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingsInput
          label="Nama Lengkap"
          value={profileData.name}
          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Masukkan nama lengkap"
        />
        <SettingsInput
          label="Email"
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Masukkan email"
        />
        <SettingsInput
          label="Nomor Telepon"
          value={profileData.phone}
          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Masukkan nomor telepon"
        />
        <div className="md:col-span-2">
          <SettingsTextArea
            label="Bio"
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Ceritakan tentang diri Anda"
            rows={3}
          />
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Ubah Password</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <SettingsInput
              label="Password Saat Ini"
              type={showPassword ? 'text' : 'password'}
              value={profileData.currentPassword}
              onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
              placeholder="Masukkan password saat ini"
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <SettingsInput
            label="Password Baru"
            type="password"
            value={profileData.newPassword}
            onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
            placeholder="Masukkan password baru"
          />
          <SettingsInput
            label="Konfirmasi Password Baru"
            type="password"
            value={profileData.confirmPassword}
            onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Konfirmasi password baru"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <SettingsButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </>
          )}
        </SettingsButton>
      </div>
    </form>
  );

  const renderNotificationsTab = () => (
    <form onSubmit={handleNotificationSubmit} className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Pengaturan Notifikasi</h4>
        
        <SettingsToggle
          label="Notifikasi Email"
          description="Terima notifikasi melalui email"
          checked={notificationSettings.emailNotifications}
          onChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
        />
        
        <SettingsToggle
          label="Notifikasi Push"
          description="Terima notifikasi push di browser"
          checked={notificationSettings.pushNotifications}
          onChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
        />
        
        <SettingsToggle
          label="Pengingat Event"
          description="Terima pengingat untuk event yang akan datang"
          checked={notificationSettings.eventReminders}
          onChange={(checked) => setNotificationSettings(prev => ({ ...prev, eventReminders: checked }))}
        />
        
        <SettingsToggle
          label="Alert Donasi"
          description="Terima notifikasi ketika ada donasi baru"
          checked={notificationSettings.donationAlerts}
          onChange={(checked) => setNotificationSettings(prev => ({ ...prev, donationAlerts: checked }))}
        />
        
        <SettingsToggle
          label="Laporan Mingguan"
          description="Terima laporan mingguan aktivitas platform"
          checked={notificationSettings.weeklyReports}
          onChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyReports: checked }))}
        />
        
        <SettingsToggle
          label="Email Marketing"
          description="Terima email tentang fitur baru dan promosi"
          checked={notificationSettings.marketingEmails}
          onChange={(checked) => setNotificationSettings(prev => ({ ...prev, marketingEmails: checked }))}
        />
      </div>

      <div className="flex justify-end">
        <SettingsButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </>
          )}
        </SettingsButton>
      </div>
    </form>
  );

  const renderSystemTab = () => (
    <form onSubmit={handleSystemSubmit} className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Pengaturan Umum</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsInput
            label="Nama Situs"
            value={systemSettings.siteName}
            onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
            placeholder="Nama situs web"
          />
          <SettingsInput
            label="Email Kontak"
            type="email"
            value={systemSettings.contactEmail}
            onChange={(e) => setSystemSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
            placeholder="Email kontak utama"
          />
          <SettingsInput
            label="Email Support"
            type="email"
            value={systemSettings.supportEmail}
            onChange={(e) => setSystemSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
            placeholder="Email support"
          />
          <SettingsInput
            label="Maksimal Peserta Event"
            type="number"
            value={systemSettings.maxEventParticipants}
            onChange={(e) => setSystemSettings(prev => ({ ...prev, maxEventParticipants: parseInt(e.target.value) }))}
            placeholder="Jumlah maksimal peserta"
          />
        </div>
        
        <SettingsTextArea
          label="Deskripsi Situs"
          value={systemSettings.siteDescription}
          onChange={(e) => setSystemSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
          placeholder="Deskripsi singkat tentang situs"
          rows={3}
        />
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Pengaturan Event</h4>
        
        <SettingsToggle
          label="Auto Approve Event"
          description="Otomatis menyetujui event baru tanpa review manual"
          checked={systemSettings.autoApproveEvents}
          onChange={(checked) => setSystemSettings(prev => ({ ...prev, autoApproveEvents: checked }))}
        />
        
        <SettingsToggle
          label="Mode Maintenance"
          description="Aktifkan mode maintenance untuk situs"
          checked={systemSettings.maintenanceMode}
          onChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
        />
      </div>

      <div className="flex justify-end">
        <SettingsButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </>
          )}
        </SettingsButton>
      </div>
    </form>
  );

  const renderAppearanceTab = () => (
    <form onSubmit={handleAppearanceSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingsSelect
          label="Tema"
          value={appearanceSettings.theme}
          onChange={(e) => setAppearanceSettings(prev => ({ ...prev, theme: e.target.value }))}
        >
          <option value="light">Terang</option>
          <option value="dark">Gelap</option>
          <option value="auto">Otomatis</option>
        </SettingsSelect>
        
        <SettingsSelect
          label="Bahasa"
          value={appearanceSettings.language}
          onChange={(e) => setAppearanceSettings(prev => ({ ...prev, language: e.target.value }))}
        >
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English</option>
        </SettingsSelect>
        
        <SettingsSelect
          label="Zona Waktu"
          value={appearanceSettings.timezone}
          onChange={(e) => setAppearanceSettings(prev => ({ ...prev, timezone: e.target.value }))}
        >
          <option value="Asia/Jakarta">WIB (Jakarta)</option>
          <option value="Asia/Makassar">WITA (Makassar)</option>
          <option value="Asia/Jayapura">WIT (Jayapura)</option>
        </SettingsSelect>
        
        <SettingsSelect
          label="Format Tanggal"
          value={appearanceSettings.dateFormat}
          onChange={(e) => setAppearanceSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
        >
          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
          <option value="yyyy-mm-dd">YYYY-MM-DD</option>
        </SettingsSelect>
      </div>

      <div className="flex justify-end">
        <SettingsButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </>
          )}
        </SettingsButton>
      </div>
    </form>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-center">
          <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Pengaturan Keamanan
          </h4>
        </div>
        <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
          Fitur keamanan lanjutan akan segera tersedia. Saat ini Anda dapat mengubah password di tab Profil.
        </p>
      </div>
      
      <SettingsCard className="p-6">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Aktivitas Login Terakhir</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Login dari Chrome</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">IP: 192.168.1.1 • Jakarta, Indonesia</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">2 jam yang lalu</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Login dari Firefox</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">IP: 192.168.1.1 • Jakarta, Indonesia</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">1 hari yang lalu</span>
          </div>
        </div>
      </SettingsCard>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      case 'system':
        return renderSystemTab();
      case 'appearance':
        return renderAppearanceTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h2>
        <p className="text-gray-600 dark:text-gray-400">Kelola pengaturan akun dan sistem platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <SettingsCard className="p-6">
            {renderTabContent()}
          </SettingsCard>
        </div>
      </div>
    </div>
  );
};

export default Settings;