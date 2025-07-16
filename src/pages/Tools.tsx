import { useState, useEffect } from "react";
import {
  fetchTools,
  fetchToolById,
  createTool,
  updateTool,
  deleteTool,
} from "../api/tools";
import AdminLayout from "../components/AdminLayout";
import ToolModal from "../components/ToolModal";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toolToDelete, setToolToDelete] = useState<any>(null);

  useEffect(() => {
    const getTools = async () => {
      setLoading(true);
      try {
        const data = await fetchTools();
        setTools(data);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    };
    getTools();
  }, [refresh]);

  const handleRowClick = async (tool: any) => {
    try {
      const data = await fetchToolById(tool.id);
      setSelectedTool(data);
      setIsViewMode(true);
      setIsModalOpen(true);
    } catch (err) {
      // handle error
    }
  };

  const handleEdit = async (tool: any) => {
    setLoading(true);
    try {
      const data = await fetchToolById(tool.id);
      setSelectedTool({
        ...data,
        image: data.img_url || null,
      });
      setIsViewMode(false);
      setIsModalOpen(true);
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  const handleAdd = () => {
    setSelectedTool(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = (tool: any) => {
    setToolToDelete(tool);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteTool = async () => {
    if (!toolToDelete) return;
    setLoading(true);
    try {
      await deleteTool(toolToDelete.id);
      setTools((prev) => prev.filter((t) => t.id !== toolToDelete.id));
      setDeleteDialogOpen(false);
      setToolToDelete(null);
      setRefresh((r) => !r);
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Tools:", filteredTools);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Tools</h1>
          <button
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Tool
          </button>
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
                placeholder="Search tools..."
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
                    Tool
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTools.map((tool) => (
                  <tr
                    key={tool.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover mr-4"
                          src={`${
                            import.meta.env.VITE_API_BASE_IMAGE_URL
                          }/uploads/${tool.img_url}`}
                          alt={tool.title}
                        />
                        <div className="text-sm font-medium text-white">
                          {tool.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white max-w-md truncate block">
                        {tool.description}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRowClick(tool)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(tool)}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(tool)}
                          className="text-red-400 hover:text-red-300"
                          disabled={loading}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <ToolModal
            tool={selectedTool}
            isOpen={isModalOpen}
            isViewMode={isViewMode}
            onClose={() => setIsModalOpen(false)}
            onSave={async (toolData: any) => {
              // toolData: { title, description, image, link }
              const formData = new FormData();
              formData.append("title", toolData.title);
              formData.append("description", toolData.description);
              formData.append("link", toolData.link);
              if (toolData.image instanceof File) {
                formData.append("img_url", toolData.image);
              } else {
                formData.append("img_url", toolData.image || "");
              }
              try {
                if (selectedTool && !isViewMode) {
                  await updateTool(selectedTool[0].id, formData);
                } else {
                  await createTool(formData);
                }
                setIsModalOpen(false);
                setRefresh((r) => !r);
              } catch (err) {
                // handle error
              }
            }}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Tool</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete tool{" "}
                <b>{toolToDelete?.title}</b>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={confirmDeleteTool}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default Tools;
