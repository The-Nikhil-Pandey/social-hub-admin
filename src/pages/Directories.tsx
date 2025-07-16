import { useState, useEffect } from "react";
import {
  getDirectories,
  createDirectory,
  updateDirectory,
  deleteDirectory,
} from "../api/directories";
import { toast } from "../hooks/use-toast";
import AdminLayout from "../components/AdminLayout";
import DirectoryModal from "../components/DirectoryModal";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";

const Directories = () => {
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [directories, setDirectories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDirectories();
  }, []);

  const fetchDirectories = async () => {
    setLoading(true);
    try {
      const data = await getDirectories();
      setDirectories(data);
    } catch {
      toast({ title: "Failed to fetch directories", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (directory: any) => {
    setSelectedDirectory(directory);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleEdit = (directory: any) => {
    setSelectedDirectory(directory);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedDirectory(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await deleteDirectory(deleteId);
      setDirectories((prev) => prev.filter((d) => d.id !== deleteId));
      toast({ title: "Directory deleted successfully", variant: "default" });
    } catch {
      toast({ title: "Failed to delete directory", variant: "destructive" });
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  // Map API fields to UI fields for display and search
  const mappedDirectories = directories.map((d) => ({
    id: d.id,
    place_name: d.place_name,
    place_location: d.location, // API: location -> UI: place_location
    location_url: d.location_url,
    person_name: d.p_name, // API: p_name -> UI: person_name
    person_email: d.p_email, // API: p_email -> UI: person_email
    image: d.p_photo, // API: p_photo -> UI: image
    created_at: d.created_at,
    updated_at: d.updated_at,
    status: d.status,
  }));

  const filteredDirectories = mappedDirectories.filter(
    (directory) =>
      directory.place_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.place_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-white text-lg font-semibold">Loading...</div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Directories</h1>
          <button
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Directory
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
                placeholder="Search directories..."
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
                    Place
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contact Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredDirectories.map((directory) => (
                  <tr
                    key={directory.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover mr-4"
                          src={
                            directory.image &&
                            !directory.image.startsWith("http")
                              ? `${
                                  import.meta.env.VITE_API_BASE_IMAGE_URL
                                }/uploads/${directory.image}`
                              : directory.image
                          }
                          alt={directory.place_name}
                        />
                        <div className="text-sm font-medium text-white">
                          {directory.place_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">
                        {directory.place_location}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {directory.person_name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {directory.person_email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRowClick(directory)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(directory)}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          <Edit size={16} />
                        </button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => setDeleteId(directory.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Directory
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this directory?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => setDeleteId(null)}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDelete}
                                disabled={deleteLoading}
                              >
                                {deleteLoading ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <DirectoryModal
            directory={selectedDirectory}
            isOpen={isModalOpen}
            isViewMode={isViewMode}
            onClose={() => setIsModalOpen(false)}
            onSave={async (directoryData: any) => {
              setLoading(true);
              try {
                if (directoryData.id) {
                  await updateDirectory(directoryData.id, directoryData);
                  toast({
                    title: "Directory updated successfully",
                    variant: "default",
                  });
                } else {
                  await createDirectory(directoryData);
                  toast({
                    title: "Directory created successfully",
                    variant: "default",
                  });
                }
                setIsModalOpen(false);
                await fetchDirectories();
              } catch {
                toast({
                  title: "Failed to save directory",
                  variant: "destructive",
                });
              } finally {
                setLoading(false);
              }
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Directories;
