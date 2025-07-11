
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Search, Eye, Check, X } from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // API HERE: Fetch Reports
  const dummyReports = [
    {
      id: "r1",
      reported_by: "Aman Singh",
      post_title: "Social Work Misconceptions",
      status: "Pending",
      action: null,
      created_at: "2024-01-15T10:30:00Z",
      reason: "Inappropriate content"
    },
    {
      id: "r2",
      reported_by: "Kavya Sharma",
      post_title: "Mental Health Awareness",
      status: "Action Taken",
      action: "Deleted",
      created_at: "2024-01-14T15:45:00Z",
      reason: "Misinformation"
    },
    {
      id: "r3",
      reported_by: "Rohit Kumar",
      post_title: "Childcare Guidelines",
      status: "Action Taken", 
      action: "Ignored (Fake Report)",
      created_at: "2024-01-13T09:20:00Z",
      reason: "Spam"
    }
  ];

  const handleUpdateStatus = (reportId: string, action: string) => {
    // API HERE: Update Report Status
    console.log('Update report:', reportId, 'Action:', action);
  };

  const filteredReports = dummyReports.filter(report =>
    report.reported_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.post_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Action Taken':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string) => {
    if (action === 'Deleted') {
      return 'bg-red-100 text-red-800';
    } else if (action === 'Ignored (Fake Report)') {
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-gray-100 text-gray-800';
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reported By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Post Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action Taken</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-white">{report.reported_by}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white max-w-xs truncate block">{report.post_title}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-300">{report.reason}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {report.action ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(report.action)}`}>
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
                      {report.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateStatus(report.id, 'Deleted')}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                          >
                            <X size={12} />
                            Delete Post
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(report.id, 'Ignored (Fake Report)')}
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
    </AdminLayout>
  );
};

export default Reports;
