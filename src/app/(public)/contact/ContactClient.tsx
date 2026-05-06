'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Loader2, Globe } from 'lucide-react';
import Image from 'next/image';
import { useSubmitInquiryMutation } from '@/lib/redux/slices/apiSlice';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    _honeypot: '', // Honeypot field
  });
  const [submitInquiry, { isLoading: loading }] = useSubmitInquiryMutation();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData._honeypot) {
      console.warn('Bot detected');
      return;
    }

    setError(null);
    try {
      await submitInquiry(formData).unwrap();
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', _honeypot: '' });
    } catch (err: any) {
      setError(err.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 translate-x-24" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              Let's <span className="text-blue-600">Connect</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              Have questions about a property or need expert real estate advice? Our team is here to guide you through every step of your journey.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {[
                { 
                  icon: Phone, 
                  title: 'Call Us', 
                  content: '+91 98765 43210', 
                  sub: 'Mon-Sat, 9am - 7pm',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
                },
                { 
                  icon: Mail, 
                  title: 'Email Us', 
                  content: 'hello@romanestate.com', 
                  sub: 'Response within 24 hours',
                  color: 'text-purple-600',
                  bg: 'bg-purple-50'
                },
                { 
                  icon: MapPin, 
                  title: 'Visit Office', 
                  content: '123 Business Park, BKC, Mumbai 400051', 
                  sub: 'Directions available',
                  color: 'text-orange-600',
                  bg: 'bg-orange-50'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-start group hover:shadow-xl transition-all duration-500">
                  <div className={`${item.bg} ${item.color} p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform shadow-sm`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.title}</h3>
                    <p className="text-lg font-extrabold text-gray-900 mb-1">{item.content}</p>
                    <p className="text-xs text-gray-500 font-bold">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social & Other Info */}
            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-blue-400" />
                  Follow Our Journey
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed font-medium">
                  Join our community of 50k+ happy homeowners and stay updated with the latest market insights.
                </p>
                <div className="flex gap-4">
                  {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                    <button key={social} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-white/10">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100 p-8 md:p-12 relative overflow-hidden">
              {submitted ? (
                <div className="text-center py-16 space-y-8">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Message Sent!</h2>
                    <p className="text-gray-500 text-lg font-medium">Thank you for reaching out. One of our experts will contact you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl active:scale-95"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center">
                      <MessageSquare className="w-8 h-8 mr-4 text-blue-600" />
                      Send a Message
                    </h2>
                    <p className="text-gray-500 font-medium">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users */}
                    <input 
                      type="text" 
                      name="_honeypot" 
                      style={{ display: 'none' }} 
                      tabIndex={-1} 
                      autoComplete="off"
                      value={formData._honeypot}
                      onChange={(e) => setFormData({...formData, _honeypot: e.target.value})}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Full Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          required
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Your Message</label>
                      <textarea 
                        required
                        rows={5}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none font-medium"
                        placeholder="Tell us about your requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                        {error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] uppercase tracking-widest"
                    >
                      {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          Send Message <Send className="w-5 h-5 ml-3" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="h-[500px] bg-gray-200 rounded-[3rem] overflow-hidden border border-gray-100 relative group shadow-inner">
          <Image 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
            alt="Office Location"
            fill
            sizes="100vw"
            className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/20 transform group-hover:scale-105 transition-transform">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse" />
              <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Headquarters</p>
            </div>
            <p className="text-lg font-bold text-gray-700">Roman Estate, BKC, Mumbai</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Maharashtra, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
