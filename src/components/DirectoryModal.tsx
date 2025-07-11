
import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import FileUpload from './FileUpload';

interface DirectoryModalProps {
  directory: any;
  isOpen: boolean;
  isViewMode: boolean;
  onClose: () => void;
  onSave: (directoryData: any) => void;
}

const DirectoryModal = ({ directory, isOpen, isViewMode, onClose, onSave }: DirectoryModalProps) => {
  const [formData, setFormData] = useState({
    place_name: '',
    place_location: '',
    location_url: '',
    person_name: '',
    person_email: '',
    image: null as File | string | null,
  });

  useEffect(() => {
    if (directory) {
      setFormData(directory);
    } else {
      setFormData({
        place_name: '',
        place_location: '',
        location_url: '',
        person_name: '',
        person_email: '',
        image: null,
      });
    }
  }, [directory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // API HERE: File Upload API here: POST /api/upload-file
    console.log('Directory data with file:', formData);
    
    onSave(formData);
  };

  if (!isOpen) return null;

  if (isViewMode && directory) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Directory Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              {directory.image && (
                <img
                  src={typeof directory.image === 'string' ? directory.image : URL.createObjectURL(directory.image)}
                  alt={directory.place_name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{directory.place_name}</h3>
              <p className="text-gray-300 mb-4">{directory.place_location}</p>
              {directory.location_url && (
                <a
                  href={directory.location_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1 mb-6"
                >
                  View on Map <ExternalLink size={16} />
                </a>
              )}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-lg font-semibold text-white mb-3">Contact Person</h4>
              <div>
                <div className="text-white font-medium">{directory.person_name}</div>
                <div className="text-gray-400">{directory.person_email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {directory ? 'Edit Directory' : 'Add New Directory'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Place Name
            </label>
            <input
              type="text"
              value={formData.place_name}
              onChange={(e) => setFormData({ ...formData, place_name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.place_location}
              onChange={(e) => setFormData({ ...formData, place_location: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location URL (Maps)
            </label>
            <input
              type="url"
              value={formData.location_url}
              onChange={(e) => setFormData({ ...formData, location_url: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contact Person Name
            </label>
            <input
              type="text"
              value={formData.person_name}
              onChange={(e) => setFormData({ ...formData, person_name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contact Person Email
            </label>
            <input
              type="email"
              value={formData.person_email}
              onChange={(e) => setFormData({ ...formData, person_email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Place Image
            </label>
            <FileUpload
              value={formData.image}
              onChange={(file) => setFormData({ ...formData, image: file })}
              accept="image/*"
              placeholder="Upload Place Image"
              type="image"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              {directory ? 'Update' : 'Create'} Directory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DirectoryModal;
