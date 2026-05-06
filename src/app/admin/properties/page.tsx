'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import axios from 'axios';
import DeleteModal from '@/components/DeleteModal';

export default function AdminProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const openDeleteModal = (property: any) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedProperty) return;
    
    try {
      await axios.delete(`/api/properties/${selectedProperty._id}`);
      setProperties(properties.filter(p => p._id !== selectedProperty._id));
      setIsModalOpen(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DeleteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title={selectedProperty?.title || ''}
      />
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Properties</h2>
        <Link 
          href="/admin/properties/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Property</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Location</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-center text-gray-500 italic" colSpan={5}>
                  No properties found. Start by adding your first listing!
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{property.title}</div>
                    <div className="text-xs text-gray-500">{property.type} • {property.bedrooms} BHK</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {property.location.area}, {property.location.city}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                    ₹{property.price.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      property.status === 'For Sale' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link 
                      href={`/admin/properties/${property._id}`}
                      className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button 
                      onClick={() => openDeleteModal(property)}
                      className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
