import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Home as HomeIcon, Star, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roman Estate | Luxury Real Estate Mumbai',
  description: 'Find your dream home in Mumbai with Roman Estate. Premium properties, luxury apartments, and exclusive commercial spaces.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Home" 
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Find Your <span className="text-blue-500">Dream Home</span> <br /> in Mumbai
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Discover premium properties, luxury apartments, and exclusive commercial spaces with Roman Estate.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div className="flex-1 w-full flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search area, project, or developer..." 
                className="w-full bg-transparent text-gray-900 outline-none text-sm"
              />
            </div>
            <div className="w-full md:w-48 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
              <HomeIcon className="w-5 h-5 text-gray-400 mr-3" />
              <select className="bg-transparent text-gray-900 outline-none text-sm w-full appearance-none">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Commercial</option>
              </select>
            </div>
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 -mt-10 relative z-30 max-w-6xl mx-auto w-full px-4 rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
        <div className="text-center px-4">
          <p className="text-3xl font-bold text-gray-900">1000+</p>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Properties</p>
        </div>
        <div className="text-center px-4">
          <p className="text-3xl font-bold text-gray-900">500+</p>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Happy Clients</p>
        </div>
        <div className="text-center px-4">
          <p className="text-3xl font-bold text-gray-900">30+</p>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Experience</p>
        </div>
        <div className="text-center px-4">
          <p className="text-3xl font-bold text-gray-900">15+</p>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Locations</p>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Our Selection</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Properties</h3>
            </div>
            <Link href="/properties" className="text-blue-600 font-bold flex items-center hover:underline">
              View All <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" 
                    alt="Property" 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    Featured
                  </div>
                  <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                    For Sale
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Luxury Suite {i}
                    </h4>
                    <p className="text-blue-600 font-bold text-lg">₹2.5 Cr</p>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    Opera House, South Mumbai
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-gray-600 text-sm">
                    <span>3 BHK</span>
                    <span>1800 Sq Ft</span>
                    <div className="flex items-center text-orange-500">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      4.9
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[400px] md:h-[500px]">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full z-0" />
            <Image 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" 
              alt="Our Service" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="relative z-10 rounded-3xl shadow-2xl object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20">
               <p className="text-2xl font-bold text-blue-600">30+</p>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Years Exp</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Why Choose Us</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                We Help You Find the <br /> Right Property
              </h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              With decades of experience in the South Mumbai real estate market, we provide unparalleled expertise and personalized service for buyers, sellers, and investors.
            </p>
            <ul className="space-y-4">
              {['Market Analysis', 'Legal Documentation', 'Direct Negotiations', 'Property Management'].map((item) => (
                <li key={item} className="flex items-center text-gray-800 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg">
              Learn More About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
