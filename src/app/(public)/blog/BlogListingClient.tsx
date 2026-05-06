'use client';
import { useState } from 'react';
import { FileText, Calendar, User, ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogListingClientProps {
  initialBlogs: any[];
}

export default function BlogListingClient({ initialBlogs }: BlogListingClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = initialBlogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-16">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-700 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl text-center space-y-6 border border-dashed border-gray-200 shadow-sm max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-12 h-12 text-gray-300" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">We couldn't find any articles matching your search criteria.</p>
          </div>
          <button 
            onClick={() => setSearchTerm('')}
            className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            Show all articles <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogs.map((blog) => (
            <Link 
              href={`/blog/${blog.slug}`}
              key={blog._id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={blog.image || `https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800`} 
                  alt={blog.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-wider shadow-sm">
                  {blog.tags?.[0] || 'Real Estate'}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center space-x-4 mb-4 text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                    <User className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                    {blog.author}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 leading-tight">
                  {blog.title}
                </h3>
                
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center text-blue-600 text-sm font-bold group-hover:translate-x-2 transition-transform duration-300">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
