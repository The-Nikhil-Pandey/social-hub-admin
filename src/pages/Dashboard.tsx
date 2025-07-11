
import AdminLayout from '../components/AdminLayout';
import DashboardStats from '../components/DashboardStats';
import { Calendar, Users, FileText, Tags, AlertTriangle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // API HERE: GET /api/summary/dashboard
  const dashboardData = {
    totalUsers: 1234,
    totalPosts: 856,
    totalEvents: 42,
    totalTags: 28,
    totalReports: 23,
    pendingReports: 8,
    monthlyGrowth: {
      users: 12,
      posts: 8,
      events: 15,
    }
  };

  const activityData = [
    { month: 'Jan', users: 980, posts: 720 },
    { month: 'Feb', users: 1050, posts: 780 },
    { month: 'Mar', users: 1150, posts: 820 },
    { month: 'Apr', users: 1234, posts: 856 },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Overview of your CUSP platform</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Additional Stats */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Platform Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-red-500" />
                  <span className="text-gray-300">Pending Reports</span>
                </div>
                <span className="text-white font-semibold">{dashboardData.pendingReports}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Tags size={20} className="text-purple-500" />
                  <span className="text-gray-300">Total Tags</span>
                </div>
                <span className="text-white font-semibold">{dashboardData.totalTags}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-green-500" />
                  <span className="text-gray-300">Growth Rate</span>
                </div>
                <span className="text-green-400 font-semibold">+{dashboardData.monthlyGrowth.users}%</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">New user registered: Aarav Mehta</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300">Event created: Wellness Workshop</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Post reported: Mental Health Tips</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">New course added: Social Work Ethics</span>
              </div>
            </div>
          </div>

          {/* Monthly Chart Placeholder */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Monthly Growth</h3>
            <div className="space-y-4">
              {activityData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{data.month}</span>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">{data.users}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">{data.posts}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors flex items-center gap-2">
              <Users size={20} />
              Add User
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors flex items-center gap-2">
              <Calendar size={20} />
              Create Event
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors flex items-center gap-2">
              <FileText size={20} />
              Add Course
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors flex items-center gap-2">
              <AlertTriangle size={20} />
              View Reports
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
