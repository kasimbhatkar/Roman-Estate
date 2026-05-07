import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Home as HomeIcon,
  Star,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import Partner from "@/models/Partner";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import PartnersCarousel from "@/components/PartnersCarousel";

export const metadata: Metadata = {
  title: "Roman Estate | Luxury Real Estate Mumbai",
  description:
    "Find your dream home in Mumbai with Roman Estate. Premium properties, luxury apartments, and exclusive commercial spaces.",
};

export const dynamic = "force-dynamic";

async function getFeaturedProperties() {
  try {
    await connectDB();
    // Assuming featured is a boolean field in your Property model
    const properties = await Property.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    return JSON.parse(JSON.stringify(properties));
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
}

async function getLatestProperties() {
  try {
    await connectDB();
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    return JSON.parse(JSON.stringify(properties));
  } catch (error) {
    console.error("Error fetching latest properties:", error);
    return [];
  }
}

async function getPartners() {
  try {
    await connectDB();
    const partners = await Partner.find({ active: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(partners));
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  const latestProperties = await getLatestProperties();
  const partners = await getPartners();

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
            Find Your <span className="text-blue-500">Dream Home</span> <br />{" "}
            in Mumbai
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Discover premium properties, luxury apartments, and exclusive
            commercial spaces with Roman Estate.
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
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
            Properties
          </p>
        </div>
        <div className="text-center px-4">
          <p className="text-3xl font-bold text-gray-900">500+</p>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
            Happy Clients
          </p>
        </div>
        <div className="text-center px-4">
          <p className="text-3xl font-bold text-gray-900">30+</p>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
            Experience
          </p>
        </div>
        <div className="text-center px-4">
          <p className="text-3xl font-bold text-gray-900">15+</p>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
            Locations
          </p>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                Our Selection
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Properties
              </h3>
            </div>
            <Link
              href="/properties"
              className="text-blue-600 font-bold flex items-center hover:underline"
            >
              View All <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <FeaturedCarousel properties={featuredProperties} />
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
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Years Exp
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                Why Choose Us
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                We Help You Find the <br /> Right Property
              </h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              With decades of experience in the South Mumbai real estate market,
              we provide unparalleled expertise and personalized service for
              buyers, sellers, and investors.
            </p>
            <ul className="space-y-4">
              {[
                "Market Analysis",
                "Legal Documentation",
                "Direct Negotiations",
                "Property Management",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center text-gray-800 font-medium"
                >
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

      {/* Latest Properties Section */}
      <section className="py-24 bg-[#fff5f0]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-4 mb-12">
            <h2 className="text-sm font-bold text-[#800000] tracking-widest">
              Properties
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 font-serif">
              Latest Listings
            </h3>
            <div className="flex justify-center items-center space-x-2 text-[#800000] py-2">
              <span>- - - - -</span>
              <div className="w-3 h-3 border border-[#800000] rotate-45"></div>
              <span>- - - - -</span>
            </div>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto pt-2 leading-relaxed">
              Explore premium residential options crafted for urban comfort and
              luxury living. Each listing includes top-tier amenities,
              convenient access, and thoughtfully designed spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {latestProperties.map((property: any) => (
              <Link
                href={`/properties/${property._id}`}
                key={property._id}
                className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col rounded-sm"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={
                      property.images && property.images.length > 0
                        ? property.images[0]
                        : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={property.title || "Property"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Featured slanted ribbon */}
                  <div className="absolute top-4 -left-8 bg-[#800000] text-white px-8 py-1 text-[10px] font-bold shadow-sm transform -rotate-45 text-center origin-center uppercase tracking-widest">
                    Featured
                  </div>
                  {/* Status Box */}
                  <div className="absolute top-2 right-2 bg-[#800000] text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                    {property.status === "For Sale"
                      ? "Ongoing Project"
                      : property.status || "For Sale"}
                  </div>
                  {/* Bottom overlay with basic stats */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-gray-200 text-xs font-bold font-serif">
                      {property.size || 0} SQ.FT. -{" "}
                      {property.size ? property.size + 1000 : 0} SQ.FT.
                    </p>
                    <p className="text-white font-bold text-lg">
                      {property.bedrooms || 0} BHK /{" "}
                      {property.bedrooms ? property.bedrooms + 1 : 0} BHK
                    </p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#800000] transition-colors line-clamp-1 font-serif">
                      {property.title}
                    </h4>
                    <div className="flex items-center text-gray-500 text-xs mt-3">
                      <MapPin className="w-3 h-3 mr-2 shrink-0 text-[#800000]" />
                      <span className="line-clamp-1">
                        {property.location?.address ||
                          property.location?.city ||
                          property.location?.type ||
                          "Mumbai"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 border-dashed grid grid-cols-2 gap-y-3">
                    <div className="flex items-center text-[10px] text-gray-600">
                      <span className="text-[#800000] mr-2 text-sm font-bold">
                        ✓
                      </span>
                      <span className="truncate">Premium Amenities</span>
                    </div>
                    <div className="flex items-center text-[10px] text-gray-600">
                      <span className="text-[#800000] mr-2 text-sm font-bold">
                        ✓
                      </span>
                      <span className="truncate">Secure Layout</span>
                    </div>
                  </div>

                  {/* Mock Pagination Buttons for Card Aesthetics block */}
                  <div className="pt-4 bg-gray-50 -mx-6 -mb-6 px-6 py-4 flex justify-between items-center text-gray-400 border-t border-gray-100 border-dashed">
                    <span className="text-gray-400 font-black text-xl hover:text-[#800000]">
                      ◀
                    </span>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-gray-300"></div>
                      <div className="w-8 h-5 bg-gray-300 opacity-0 hidden sm:block"></div>
                    </div>
                    <span className="text-gray-400 font-black text-xl hover:text-[#800000]">
                      ▶
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/properties"
              className="inline-block bg-[#800000] font-serif tracking-widest text-sm text-white px-8 py-3 font-bold hover:bg-red-900 transition-all"
            >
              Explore All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-4 mb-16">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 font-serif tracking-wide">
              Our Partners
            </h3>
            <div className="flex justify-center items-center space-x-2 text-[#800000] py-2">
              <span>- - - - -</span>
              <div className="w-3 h-3 border border-[#800000] rotate-45"></div>
              <span>- - - - -</span>
            </div>
            <p className="text-gray-900 font-medium max-w-3xl mx-auto pt-4 leading-relaxed font-serif text-lg">
              Our success is built on trusted partnerships with industry-leading
              collaborators.
              <br />
              These alliances help us deliver exceptional quality, consistent
              reliability, and
              <br />
              exclusive opportunities that benefit every client.
            </p>
          </div>

          <PartnersCarousel partners={partners} />
        </div>
      </section>
    </div>
  );
}
