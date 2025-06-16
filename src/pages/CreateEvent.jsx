import React, { useState } from 'react';
import { 
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

// CreateEvent Components
const CreateEventButton = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button', ...props }) => {
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

const CreateEventInput = ({ label, error, className = '', ...props }) => {
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

const CreateEventSelect = ({ label, error, children, className = '', ...props }) => {
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

const CreateEventTextArea = ({ label, error, className = '', ...props }) => {
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

const CreateEventCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

const ImageUploadCard = ({ imagePreview, onImageChange, error }) => {
  return (
    <CreateEventCard className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gambar Event</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            {imagePreview ? (
              <div className="relative w-full h-full">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                  <p className="text-white text-sm">Klik untuk mengganti gambar</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG atau JPEG (MAX. 5MB)</p>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onImageChange}
            />
          </label>
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </CreateEventCard>
  );
};

// Main CreateEvent Component
const CreateEvent = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: '',
    maxParticipants: '',
    fundingType: 'self-funded',
    fundingAmount: '',
    requirements: '',
    benefits: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    'Pembersihan Pantai',
    'Reboisasi',
    'Edukasi',
    'Konservasi Air',
    'Pembersihan Sungai',
    'Konservasi Laut',
    'Daur Ulang',
    'Energi Terbarukan'
  ];

  const fundingTypes = [
    { value: 'self-funded', label: 'Self-funded (Gratis untuk peserta)' },
    { value: 'half-funded', label: 'Half-funded (Sebagian dibiayai)' },
    { value: 'fully-funded', label: 'Fully-funded (Sepenuhnya dibiayai)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Ukuran file maksimal 5MB'
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'File harus berupa gambar'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setErrors(prev => ({
        ...prev,
        image: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Judul event wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi event wajib diisi';
    if (!formData.location.trim()) newErrors.location = 'Lokasi event wajib diisi';
    if (!formData.date) newErrors.date = 'Tanggal event wajib diisi';
    if (!formData.time) newErrors.time = 'Waktu event wajib diisi';
    if (!formData.category) newErrors.category = 'Kategori event wajib dipilih';
    if (!formData.maxParticipants || formData.maxParticipants < 1) {
      newErrors.maxParticipants = 'Jumlah peserta maksimal harus lebih dari 0';
    }
    if (formData.fundingType !== 'self-funded' && (!formData.fundingAmount || formData.fundingAmount < 0)) {
      newErrors.fundingAmount = 'Jumlah dana harus diisi dan tidak boleh negatif';
    }
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Nama kontak person wajib diisi';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Nomor telepon kontak wajib diisi';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email kontak wajib diisi';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Format email tidak valid';
    }

    if (formData.date) {
      const eventDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        newErrors.date = 'Tanggal event harus di masa depan';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Event data:', formData);
      onSave(formData);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <CreateEventButton variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </CreateEventButton>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Buat Event Baru</h2>
          <p className="text-gray-600 dark:text-gray-400">Buat event relawan lingkungan baru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <CreateEventCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Dasar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <CreateEventInput
                label="Judul Event *"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={errors.title}
                placeholder="Masukkan judul event"
              />
            </div>
            
            <div className="md:col-span-2">
              <CreateEventTextArea
                label="Deskripsi Event *"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Jelaskan detail event, tujuan, dan aktivitas yang akan dilakukan"
                rows={4}
              />
            </div>

            <CreateEventInput
              label="Lokasi Event *"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              error={errors.location}
              placeholder="Alamat lengkap lokasi event"
            />

            <CreateEventSelect
              label="Kategori Event *"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              error={errors.category}
            >
              <option value="">Pilih kategori</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </CreateEventSelect>

            <CreateEventInput
              label="Tanggal Event *"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              error={errors.date}
            />

            <CreateEventInput
              label="Waktu Event *"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
              error={errors.time}
            />
          </div>
        </CreateEventCard>

        {/* Participants & Funding */}
        <CreateEventCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Peserta & Pendanaan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CreateEventInput
              label="Jumlah Peserta Maksimal *"
              name="maxParticipants"
              type="number"
              min="1"
              value={formData.maxParticipants}
              onChange={handleInputChange}
              error={errors.maxParticipants}
              placeholder="Contoh: 50"
            />

            <CreateEventSelect
              label="Tipe Pendanaan *"
              name="fundingType"
              value={formData.fundingType}
              onChange={handleInputChange}
              error={errors.fundingType}
            >
              {fundingTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </CreateEventSelect>

            {formData.fundingType !== 'self-funded' && (
              <CreateEventInput
                label="Jumlah Dana (Rp) *"
                name="fundingAmount"
                type="number"
                min="0"
                value={formData.fundingAmount}
                onChange={handleInputChange}
                error={errors.fundingAmount}
                placeholder="Contoh: 5000000"
              />
            )}

            <div className="md:col-span-2">
              <CreateEventTextArea
                label="Persyaratan Peserta"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                error={errors.requirements}
                placeholder="Jelaskan persyaratan untuk mengikuti event ini"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <CreateEventTextArea
                label="Manfaat untuk Peserta"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                error={errors.benefits}
                placeholder="Jelaskan manfaat yang akan didapat peserta"
                rows={3}
              />
            </div>
          </div>
        </CreateEventCard>

        {/* Contact Information */}
        <CreateEventCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Kontak</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CreateEventInput
              label="Nama Kontak Person *"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              error={errors.contactPerson}
              placeholder="Nama lengkap"
            />

            <CreateEventInput
              label="Nomor Telepon *"
              name="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={handleInputChange}
              error={errors.contactPhone}
              placeholder="08xxxxxxxxxx"
            />

            <CreateEventInput
              label="Email *"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleInputChange}
              error={errors.contactEmail}
              placeholder="email@example.com"
            />
          </div>
        </CreateEventCard>

        {/* Image Upload */}
        <ImageUploadCard 
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          error={errors.image}
        />

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <CreateEventButton variant="outline" onClick={onBack} disabled={isLoading}>
            Batal
          </CreateEventButton>
          <CreateEventButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Event
              </>
            )}
          </CreateEventButton>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;