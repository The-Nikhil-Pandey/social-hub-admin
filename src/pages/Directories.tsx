
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import DirectoryModal from '../components/DirectoryModal';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

const Directories = () => {
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // API HERE: Fetch Directories
  const dummyDirectories = [
    {
      id: "d1",
      place_name: "Care Center One",
      place_location: "Bangalore",
      location_url: "https://goo.gl/maps/example",
      person_name: "Ravi Sharma",
      person_email: "ravi@example.com",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop"
    },
    {
      id: "d2",
      place_name: "Community Health Hub",
      place_location: "Chennai",
      location_url: "https://goo.gl/maps/example2",
      person_name: "Priya Nair",
      person_email: "priya@example.com",
      image: "https://images.unsplash.com/photo-1587351021355-a479a299d2fe?w=400&h=300&fit=crop"
    }
  ];

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

  const handleDelete = (directoryId: string) => {
    // API HERE: Delete Directory
    console.log('Delete directory:', directoryId);
  };

  const filteredDirectories = dummyDirectories.filter(directory =>
    directory.place_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    directory.place_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Place</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact Person</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
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
                          src={directory.image}
                          alt={directory.place_name}
                        />
                        <div className="text-sm font-medium text-white">{directory.place_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{directory.place_location}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{directory.person_name}</div>
                      <div className="text-sm text-gray-400">{directory.person_email}</div>
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
                        <button
                          onClick={() => handleDelete(directory.id)}
                          className="text-red-400 hover:text-red-300"
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
          <DirectoryModal
            directory={selectedDirectory}
            isOpen={isModalOpen}
            isViewMode={isViewMode}
            onClose={() => setIsModalOpen(false)}
            onSave={(directoryData) => {
              // API HERE: Save/Update Directory
              console.log('Save directory:', directoryData);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Directories;
