
import AdminLayout from '../components/AdminLayout';
import DashboardStats from '../components/DashboardStats';

const Index = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome to CUSP Website Admin Panel</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">New user registered: Aarav Mehta</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300">Post reported: Supporting the Elderly</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">New event created: Wellness Workshop</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors">
                Add User
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors">
                Create Event
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors">
                Add Course
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
