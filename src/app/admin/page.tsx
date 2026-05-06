import { 
  Home, 
  FileText, 
  MessageSquare, 
  TrendingUp 
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Properties', value: '0', icon: Home, color: 'bg-blue-500' },
    { name: 'Total Blogs', value: '0', icon: FileText, color: 'bg-green-500' },
    { name: 'New Inquiries', value: '0', icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'Total Visits', value: '0', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`p-4 rounded-lg ${stat.color} text-white mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Inquiries</h3>
            <button className="text-sm text-blue-600 hover:underline">View All</button>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-sm italic">No recent inquiries found.</p>
          </div>
        </div>

        {/* Recently Added Properties */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recently Added Properties</h3>
            <button className="text-sm text-blue-600 hover:underline">View All</button>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-sm italic">No properties added yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
