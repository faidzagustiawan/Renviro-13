import React, { useState } from 'react';
import AdminLayout from './components/AdminLayout';

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <AdminLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {currentPage === 'dashboard' && <div>Ini Dashboard</div>}
      {currentPage === 'events' && <div>Ini Kelola Event</div>}
      {currentPage === 'users' && <div>Ini Kelola User</div>}
      {currentPage === 'donations' && <div>Ini Donasi</div>}
      {currentPage === 'settings' && <div>Ini Pengaturan</div>}
    </AdminLayout>
  );
};

export default AdminPage;
