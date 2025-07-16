import AdminLayout from "../components/AdminLayout";
import DashboardStats from "../components/DashboardStats";
import {
  Calendar,
  Users,
  FileText,
  Tags,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
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
    },
  };

  const activityData = [
    { month: "Jan", users: 980, posts: 720 },
    { month: "Feb", users: 1050, posts: 780 },
    { month: "Mar", users: 1150, posts: 820 },
    { month: "Apr", users: 1234, posts: 856 },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Overview of your CUSP platform</p>
        </div>

        <DashboardStats />

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => navigate("/users")}
            >
              <Users size={20} />
              View Users
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => navigate("/events")}
            >
              <Calendar size={20} />
              View Events
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => navigate("/courses")}
            >
              <FileText size={20} />
              View Courses
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => navigate("/reports")}
            >
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
