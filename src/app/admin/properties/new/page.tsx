'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import { useCreatePropertyMutation } from '@/lib/redux/slices/apiSlice';

export default function NewProperty() {
  const router = useRouter();
  const [createProperty, { isLoading }] = useCreatePropertyMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    area: '',
    city: 'Mumbai',
    type: 'Apartment',
    status: 'For Sale',
    bedrooms: '',
    bathrooms: '',
    size: '',
    amenities: '',
    featured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        size: Number(formData.size),
        location: {
          address: formData.address,
          area: formData.area,
          city: formData.city
        },
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a !== '')
      };

      await createProperty(dataToSubmit).unwrap();
      router.push('/admin/properties');
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Failed to create property. Check console for details.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Link href="/admin/properties" className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to List
        </Link>
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 disabled:bg-blue-300"
        >
          <Save className="w-5 h-5 mr-2" />
          {isLoading ? 'Saving...' : 'Save Property'}
        </button>
      </div>

      <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleChange}
                placeholder="e.g. 3 BHK Luxury Apartment in South Mumbai"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                name="description" value={formData.description} onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input 
                type="number" name="price" value={formData.price} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select 
                name="type" value={formData.type} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>Apartment</option>
                <option>Villa</option>
                <option>Commercial</option>
                <option>Plot</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Location Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                type="text" name="address" value={formData.address} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <input 
                type="text" name="area" value={formData.area} onChange={handleChange}
                placeholder="e.g. Opera House"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input 
                type="text" name="city" value={formData.city} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Features & Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <input 
                type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <input 
                type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size (Sq Ft)</label>
              <input 
                type="number" name="size" value={formData.size} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
              <input 
                type="text" name="amenities" value={formData.amenities} onChange={handleChange}
                placeholder="Parking, Swimming Pool, Gym, Security"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" name="featured" checked={formData.featured} onChange={(e) => setFormData(prev => ({...prev, featured: e.target.checked}))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">Mark as Featured</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
