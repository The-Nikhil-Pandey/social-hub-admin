import { useEffect, useState } from "react";
import { Users, FileText, Calendar, AlertTriangle } from "lucide-react";
import { getUsers } from "../api/users";
import { getPosts } from "../api/posts";
import { getEvents } from "../api/events";
import { getReports } from "../api/reports";

const DashboardStats = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [postCount, setPostCount] = useState<number | null>(null);
  const [eventCount, setEventCount] = useState<number | null>(null);
  const [reportCount, setReportCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUserCount(
          Array.isArray(data) ? data.length : data?.results?.length || 0
        );
      } catch (error) {
        setUserCount(null);
      }
    };
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPostCount(
          Array.isArray(data) ? data.length : data?.results?.length || 0
        );
      } catch (error) {
        setPostCount(null);
      }
    };
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEventCount(
          Array.isArray(data) ? data.length : data?.results?.length || 0
        );
      } catch (error) {
        setEventCount(null);
      }
    };

    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReportCount(
          Array.isArray(data) ? data.length : data?.results?.length || 0
        );
      } catch (error) {
        setReportCount(null);
      }
    };
    fetchUsers();
    fetchPosts();
    fetchEvents();
    fetchReports();
  }, []);

  function formatNumber(num: number | null) {
    if (num === null) return "-";
    if (num >= 1_000_000_000)
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  }

  const stats = [
    {
      title: "Total Users",
      value: formatNumber(userCount),
      icon: Users,
      color: "bg-orange-500",
      change: "+12%",
    },
    {
      title: "Total Posts",
      value: formatNumber(postCount),
      icon: FileText,
      color: "bg-purple-500",
      change: "+8%",
    },
    {
      title: "Events",
      value: formatNumber(eventCount),
      icon: Calendar,
      color: "bg-orange-500",
      change: "+15%",
    },
    {
      title: "Reports",
      value: formatNumber(reportCount),
      icon: AlertTriangle,
      color: "bg-red-500",
      change: "-5%",
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
              {/* <p
                className={`text-sm mt-2 ${
                  stat.change.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {stat.change} from last month
              </p> */}
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
