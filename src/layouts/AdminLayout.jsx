import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Leaf,
  TreePine,
  Waves
} from 'lucide-react';

// Sidebar Component
const AdminSidebar = ({ isOpen, onClose, currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'events', label: 'Kelola Event', icon: Calendar },
    { id: 'users', label: 'Kelola User', icon: Users },
    { id: 'donations', label: 'Donasi', icon: DollarSign },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={`fixed left-0 top-0 h-full w-60 bg-gradient-to-b from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 border-r border-green-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex items-center justify-between p-4 border-b border-green-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">Re-Enviro</span>
              <p className="text-xs text-green-100">Environmental Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-green-500 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hiasan */}
        <div className="absolute top-20 right-4 opacity-10">
          <TreePine className="w-12 h-12 text-green-600" />
        </div>
        <div className="absolute top-32 left-4 opacity-10">
          <Waves className="w-10 h-10 text-blue-600" />
        </div>
        <div className="absolute bottom-24 right-6 opacity-10">
          <Leaf className="w-10 h-10 text-green-500" />
        </div>

        <nav className="p-3 space-y-1 relative z-10">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (typeof onPageChange === 'function') {
                    onPageChange(item.id);
                  }
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

// Header Component
const AdminHeader = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-600 to-emerald-600 border-b border-green-500 px-4 py-3.5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-green-500 text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <TreePine className="w-6 h-6 text-green-200" />
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <Leaf className="w-5 h-5 text-green-200" />
            </div>
            <h1 className="sm:hidden text-lg font-bold text-white">Admin Panel</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Notification button omitted for brevity */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-500 hover:bg-opacity-20 text-white"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium hidden sm:block">Eco Admin</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-green-200 dark:border-gray-700 z-50">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg">
                    <User className="w-4 h-4 text-green-600" />
                    <span>Profil</span>
                  </button>
                  <hr className="my-2 border-green-200 dark:border-gray-700" />
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg">
                    <LogOut className="w-4 h-4" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// AdminLayout Component
const AdminLayout = ({ children, currentPage, onPageChange = () => {} }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 relative">
          <div className="absolute inset-0 opacity-3 pointer-events-none">
            <div className="absolute top-10 left-10">
              <TreePine className="w-24 h-24 text-green-600" />
            </div>
            <div className="absolute top-20 right-20">
              <Leaf className="w-16 h-16 text-green-500" />
            </div>
            <div className="absolute bottom-20 left-20">
              <Waves className="w-20 h-20 text-blue-500" />
            </div>
            <div className="absolute bottom-10 right-10">
              <TreePine className="w-14 h-14 text-emerald-600" />
            </div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
