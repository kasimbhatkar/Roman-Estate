import Link from 'next/link';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold text-white">
              Roman Estate
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Leading property experts in Mumbai. We provide personalized real estate solutions with over 30 years of experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/properties" className="hover:text-white transition-colors">Our Properties</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Latest Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Property Consulting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Buying & Selling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rentals & Leasing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                <span>Opera House, Charni Road, Mumbai, Maharashtra 400004</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                <span>info@romanestate.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} Roman Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
