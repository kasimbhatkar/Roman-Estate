import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import { MapPin, Home, Star, ArrowLeft, CheckCircle2, Phone, Calendar, Ruler, Bed, Bath } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  await connectDB();
  const property = await Property.findById(id);
  
  if (!property) return { title: 'Property Not Found' };
  
  return {
    title: `${property.title} | Roman Estate`,
    description: property.description.substring(0, 160),
  };
}

async function getProperty(id: string) {
  try {
    await connectDB();
    const property = await Property.findById(id).lean();
    if (!property) return null;
    return JSON.parse(JSON.stringify(property));
  } catch (error) {
    return null;
  }
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) notFound();

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Gallery */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden group">
        <Image 
          src={property.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000'} 
          alt={property.title} 
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
        
        <div className="absolute top-8 left-8 z-20">
          <Link 
            href="/properties" 
            className="inline-flex items-center text-white bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/20 shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Search
          </Link>
        </div>

        <div className="absolute bottom-12 left-0 w-full px-4 z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-600/30">
                  {property.type}
                </span>
                <span className="bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                  {property.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center text-white/90 text-lg font-medium">
                <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                {property.location.address}, {property.location.area}, {property.location.city}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 text-white shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-widest text-white/60 mb-2">Asking Price</p>
              <p className="text-4xl font-black">₹{property.price.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Key Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Bed, label: 'Bedrooms', value: `${property.bedrooms} BHK` },
              { icon: Bath, label: 'Bathrooms', value: `${property.bathrooms} Bath` },
              { icon: Ruler, label: 'Size', value: `${property.size} Sq Ft` },
              { icon: Calendar, label: 'Listed On', value: new Date(property.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
            ].map((spec, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
                <spec.icon className="w-8 h-8 mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{spec.label}</p>
                <p className="text-lg font-extrabold text-gray-900">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
              <div className="w-2 h-8 bg-blue-600 rounded-full mr-4" />
              Property Description
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              {property.description.split('\n').map((p: string, i: number) => (
                <p key={i} className="mb-4">{p}</p>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
              <div className="w-2 h-8 bg-blue-600 rounded-full mr-4" />
              Luxury Amenities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {property.amenities.map((amenity: string, i: number) => (
                <div key={i} className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0" />
                  <span className="font-bold text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Interested?</h3>
                <p className="text-gray-400">Schedule a private viewing with our area specialist.</p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]">
                  <Phone className="w-5 h-5 mr-3" /> Call Agent
                </button>
                <Link 
                  href="/contact"
                  className="block w-full bg-white/10 hover:bg-white/20 text-white py-5 rounded-2xl font-extrabold text-lg text-center transition-all border border-white/10"
                >
                  Send Inquiry
                </Link>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xl shadow-lg">
                  R
                </div>
                <div>
                  <p className="font-extrabold text-lg">Roman Support</p>
                  <p className="text-sm text-gray-400 font-medium flex items-center">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current mr-1" />
                    Verified Partner
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Expert Tip</h4>
            <p className="text-blue-700/80 text-sm leading-relaxed">
              Properties in {property.location.area} have seen a 12% appreciation in the last 12 months. This is an excellent investment opportunity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
