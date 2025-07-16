import { useState, useEffect } from "react";
import { getReports, updateReport } from "../api/reports";
import { getUserById } from "../api/users";
import { getPostById, deletePost } from "../api/posts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import AdminLayout from "../components/AdminLayout";
import { Search, Eye, Check, X } from "lucide-react";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState<any[]>([]);
  const [userMap, setUserMap] = useState<{ [key: string]: any }>({});
  const [postMap, setPostMap] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [modalUser, setModalUser] = useState<any>(null);
  const [modalPost, setModalPost] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getReports()
      .then(async (data) => {
        const reportsArr = Array.isArray(data) ? data : data.results || [];
        setReports(reportsArr);
        // Fetch user and post info for all reports
        const userIds = Array.from(
          new Set(reportsArr.map((r: any) => r.user_id))
        );
        const postIds = Array.from(
          new Set(reportsArr.map((r: any) => r.post_id))
        );
        const userPromises = userIds.map(async (id) => {
          try {
            const user = await getUserById(Number(id));
            return [id, user];
          } catch {
            return [id, null];
          }
        });
        const postPromises = postIds.map(async (id) => {
          try {
            const post = await getPostById(String(id));
            return [id, post];
          } catch {
            return [id, null];
          }
        });
        const userResults = await Promise.all(userPromises);
        const postResults = await Promise.all(postPromises);
        setUserMap(Object.fromEntries(userResults));
        setPostMap(Object.fromEntries(postResults));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateStatus = async (reportId: string, action: string) => {
    try {
      setLoading(true);
      await updateReport(reportId, "Action Taken", action);
      setReports((prev) =>
        prev.map((r) =>
          r.id === reportId ? { ...r, r_status: "Action Taken", action } : r
        )
      );
      if (action === "Deleted") {
        // Find the report to get post id
        const report = reports.find((r) => r.id === reportId);
        if (report && report.post_id) {
          await deletePost(report.post_id);
        }
      }
    } catch (e) {
      alert("Failed to update report or delete post");
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter((report) => {
    // We'll fetch user/post info for modal, so here just filter by reason or status
    return (
      (report.reason &&
        report.reason.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.r_status &&
        report.r_status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "action taken":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionColor = (action: string) => {
    if (action === "Deleted") {
      return "bg-red-100 text-red-800";
    } else if (action === "Ignored (Fake Report)") {
      return "bg-blue-100 text-blue-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  const handleView = async (report: any) => {
    setModalLoading(true);
    setModalData(report);
    setModalOpen(true);
    try {
      const [user, post] = await Promise.all([
        getUserById(report.user_id),
        getPostById(report.post_id),
      ]);
      setModalUser(user);
      setModalPost(post);
    } catch (e) {
      setModalUser(null);
      setModalPost(null);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Reports</h1>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Reported By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Post Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Action Taken
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-white">
                        {userMap[report.user_id]?.username || report.user_id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white max-w-xs truncate block">
                        {postMap[report.post_id]?.title || report.post_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-300">
                        {report.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          report.r_status
                        )}`}
                      >
                        {report.r_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {report.action ? (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(
                            report.action
                          )}`}
                        >
                          {report.action}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-300">
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleView(report)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1 mr-2"
                        title="View Details"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      {report.r_status === "pending" && (
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() =>
                              handleUpdateStatus(report.id, "Deleted")
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                          >
                            <X size={12} />
                            Delete Post
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(
                                report.id,
                                "Ignored (Fake Report)"
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                          >
                            <Check size={12} />
                            Ignore
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {modalLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            modalData && (
              <div className="space-y-4">
                <div>
                  <strong>Reason:</strong> {modalData.reason}
                </div>
                <div>
                  <strong>Status:</strong> {modalData.r_status}
                </div>
                <div>
                  <strong>Action:</strong> {modalData.action || "-"}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(modalData.created_at).toLocaleString()}
                </div>
                <div>
                  <strong>User Info:</strong>
                  {modalUser ? (
                    <div className="mt-1 text-sm">
                      <div>
                        <b>Name:</b> {modalUser.username}
                      </div>
                      <div>
                        <b>Email:</b> {modalUser.email}
                      </div>
                      <div>
                        <b>Phone:</b> {modalUser.phone}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 ml-2">Not found</span>
                  )}
                </div>
                <div>
                  <strong>Post Info:</strong>
                  {modalPost ? (
                    <div className="mt-1 text-sm">
                      <div>
                        <b>Title:</b> {modalPost.title}
                      </div>
                      <div>
                        <b>Description:</b> {modalPost.description}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 ml-2">Not found</span>
                  )}
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Reports;
