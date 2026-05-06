'use client';
import { useEffect, useState } from 'react';
import { Search, MapPin, Home, Star, SlidersHorizontal, Loader2 } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'All',
    status: 'All',
    search: '',
  });

  useEffect(() => {
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
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => {
    const matchType = filter.type === 'All' || p.type === filter.type;
    const matchStatus = filter.status === 'All' || p.status === filter.status;
    const matchSearch = p.title.toLowerCase().includes(filter.search.toLowerCase()) || 
                        p.location.area.toLowerCase().includes(filter.search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Properties for Sale & Rent</h1>
          <p className="text-gray-500">Discover your next investment or dream home in the heart of Mumbai.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center text-gray-900 font-bold">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Area or Title..." 
                  className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={filter.search}
                  onChange={(e) => setFilter({...filter, search: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Property Type</label>
              <select 
                className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={filter.type}
                onChange={(e) => setFilter({...filter, type: e.target.value})}
              >
                <option>All</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Commercial</option>
                <option>Plot</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <div className="flex flex-col space-y-2">
                {['All', 'For Sale', 'For Rent'].map((status) => (
                  <button 
                    key={status}
                    onClick={() => setFilter({...filter, status})}
                    className={`text-left px-4 py-2 rounded-xl text-sm transition-colors ${
                      filter.status === status ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Property Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center space-y-4 border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No properties found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => setFilter({type: 'All', status: 'All', search: ''})}
                className="text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProperties.map((property) => (
                <Link 
                  href={`/properties/${property._id}`}
                  key={property._id} 
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={property.images[0] || `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800`} 
                      alt={property.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                      {property.type}
                    </div>
                    <div className={`absolute bottom-4 right-4 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
                      property.status === 'For Sale' ? 'bg-green-600/90' : 'bg-orange-600/90'
                    }`}>
                      {property.status}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {property.title}
                        </h4>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        {property.location.area}, {property.location.city}
                      </div>
                      <p className="text-blue-600 font-bold text-xl mt-2">
                        ₹{property.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-50 flex justify-between items-center text-gray-500 text-xs">
                      <div className="flex items-center">
                        <Home className="w-3.5 h-3.5 mr-1" />
                        {property.bedrooms} BHK
                      </div>
                      <div>{property.size} Sq Ft</div>
                      <div className="flex items-center text-orange-500">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" />
                        4.8
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
