
import { Users, FileText, Calendar, AlertTriangle } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      color: 'bg-orange-500',
      change: '+12%',
    },
    {
      title: 'Total Posts',
      value: '856',
      icon: FileText,
      color: 'bg-purple-500',
      change: '+8%',
    },
    {
      title: 'Events',
      value: '42',
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+15%',
    },
    {
      title: 'Reports',
      value: '23',
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-5%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <p className={`text-sm mt-2 ${
                stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change} from last month
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon size={24} className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
