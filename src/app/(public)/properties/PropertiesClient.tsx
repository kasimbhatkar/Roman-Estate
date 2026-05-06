'use client';
import { useState } from 'react';
import { Search, MapPin, Home, Star, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IProperty } from '@/models/Property';

interface PropertiesClientProps {
  initialProperties: any[]; // Using any because IProperty has Document properties that might not serialize well
}

export default function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const [filter, setFilter] = useState({
    type: 'All',
    status: 'All',
    search: '',
  });

  const filteredProperties = initialProperties.filter(p => {
    const matchType = filter.type === 'All' || p.type === filter.type;
    const matchStatus = filter.status === 'All' || p.status === filter.status;
    const matchSearch = p.title.toLowerCase().includes(filter.search.toLowerCase()) || 
                        p.location.area.toLowerCase().includes(filter.search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 space-y-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center text-gray-900 font-bold">
            <SlidersHorizontal className="w-5 h-5 mr-2 text-blue-600" />
            Filters
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Area or Title..." 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={filter.search}
                onChange={(e) => setFilter({...filter, search: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Property Type</label>
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
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
            <label className="text-sm font-bold text-gray-700 ml-1">Status</label>
            <div className="flex flex-col space-y-2">
              {['All', 'For Sale', 'For Rent'].map((status) => (
                <button 
                  key={status}
                  onClick={() => setFilter({...filter, status})}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    filter.status === status 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-gray-600 hover:bg-gray-100'
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
        {filteredProperties.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl text-center space-y-6 border border-dashed border-gray-200 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-12 h-12 text-gray-300" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms to find what you're looking for.</p>
            </div>
            <button 
              onClick={() => setFilter({type: 'All', status: 'All', search: ''})}
              className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
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
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={property.images[0] || `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800`} 
                    alt={property.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-wider shadow-sm">
                    {property.type}
                  </div>
                  <div className={`absolute bottom-4 right-4 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-white shadow-lg ${
                    property.status === 'For Sale' ? 'bg-green-600/90' : 'bg-orange-600/90'
                  } uppercase tracking-wider`}>
                    {property.status}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight">
                        {property.title}
                      </h4>
                      <div className="flex items-center text-gray-400 text-xs mt-2 font-medium">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                        {property.location.area}, {property.location.city}
                      </div>
                    </div>
                    <p className="text-blue-600 font-extrabold text-2xl">
                      ₹{property.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-gray-50 flex justify-between items-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                      <Home className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                      {property.bedrooms} BHK
                    </div>
                    <div className="bg-gray-50 px-3 py-1.5 rounded-lg">
                      {property.size} Sq Ft
                    </div>
                    <div className="flex items-center text-orange-500 bg-orange-50 px-3 py-1.5 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current mr-1.5" />
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
  );
}
