import connectDB from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import { Mail, Phone, Calendar, MessageSquare, User, Tag } from 'lucide-react';

async function getInquiries() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(inquiries));
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
}

export default async function InquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-500">Manage customer inquiries and messages.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm font-bold text-gray-600">
          Total: {inquiries.length}
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl text-center border border-dashed border-gray-200">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No inquiries yet</h3>
          <p className="text-gray-500">New messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {inquiries.map((inquiry: any) => (
            <div key={inquiry._id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className={`absolute left-0 top-0 w-1.5 h-full ${
                inquiry.status === 'New' ? 'bg-blue-500' : 
                inquiry.status === 'In Progress' ? 'bg-orange-500' : 'bg-green-500'
              }`} />
              
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="space-y-6 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-blue-600 border border-gray-100">
                      {inquiry.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{inquiry.name}</h3>
                      <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                        {new Date(inquiry.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                      <Mail className="w-4 h-4 mr-3 text-blue-500" />
                      <span className="text-sm font-medium">{inquiry.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                      <Phone className="w-4 h-4 mr-3 text-blue-500" />
                      <span className="text-sm font-medium">{inquiry.phone}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center">
                      <MessageSquare className="w-3 h-3 mr-2" /> Message
                    </p>
                    <p className="text-gray-700 leading-relaxed italic">"{inquiry.message}"</p>
                  </div>
                </div>

                <div className="md:w-48 flex flex-col justify-between items-end gap-4">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    inquiry.status === 'New' ? 'bg-blue-100 text-blue-700' : 
                    inquiry.status === 'In Progress' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {inquiry.status}
                  </div>
                  
                  <div className="space-y-2 w-full">
                    <button className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10 active:scale-95">
                      Contact User
                    </button>
                    <button className="w-full bg-white text-gray-600 border border-gray-200 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors active:scale-95">
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
