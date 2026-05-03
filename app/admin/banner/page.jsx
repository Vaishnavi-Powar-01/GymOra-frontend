'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AdminBannerPage() {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    image: null,
  });
  const [preview, setPreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${baseURL}/banners`)
      .then(res => res.json())
      .then(data => setBanners(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('buttonText', formData.buttonText);
    if (formData.image) data.append('image', formData.image);

    const endpoint = editingId
      ? `${baseURL}/banners/${editingId}`
      : `${baseURL}/banners`;

    const res = await fetch(endpoint, {
      method: editingId ? 'PUT' : 'POST',
      body: data,
    });

    if (res.ok) {
      const updated = await res.json();
      setMessage(editingId ? '✅ Banner updated!' : '✅ Banner added!');
      if (editingId) {
        setBanners(prev => prev.map(b => (b._id === updated._id ? updated : b)));
      } else {
        setBanners(prev => [...prev, updated]);
      }
      setFormData({ title: '', subtitle: '', buttonText: '', image: null });
      setPreview('');
      setEditingId(null);
    } else {
      setMessage('❌ Error saving banner.');
    }
  };

  const handleEdit = (banner) => {
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      buttonText: banner.buttonText,
      image: null,
    });
    setPreview(`${baseURL}${banner.backgroundImage}`);
    setEditingId(banner._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this banner?');
    if (!confirmDelete) return;

    const res = await fetch(`${baseURL}/banners/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setBanners(prev => prev.filter(b => b._id !== id));
      setMessage('🗑️ Banner deleted.');
    } else {
      setMessage('❌ Error deleting banner.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {editingId ? '✏️ Edit Banner' : '➕ Add New Banner'}
          </h1>
          <p className="text-gray-600">Manage your website banners</p>
        </div>

        {/* Banner Form */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter banner title"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text *
                </label>
                <input
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  placeholder="Enter button text"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle *
              </label>
              <input
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Enter banner subtitle"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                accept="image/*"
              />
            </div>

            {(preview || (editingId && formData.image === null)) && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden border border-gray-300">
                  <Image
                    src={preview || `${baseURL}${banners.find(b => b._id === editingId)?.backgroundImage}`}
                    alt="Banner preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              {editingId ? 'Update Banner' : 'Add Banner'}
            </button>

            {message && (
              <p className={`text-center text-sm font-medium ${
                message.includes('✅') ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Banner List */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Existing Banners</h2>
        {banners.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <p className="text-gray-600">No banners created yet. Add your first banner above.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{banner.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{banner.subtitle}</p>
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={`${baseURL}${banner.backgroundImage}`}
                      alt={banner.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Button:</span> {banner.buttonText}
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="flex-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-lg transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}