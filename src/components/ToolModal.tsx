
import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import FileUpload from './FileUpload';

interface ToolModalProps {
  tool: any;
  isOpen: boolean;
  isViewMode: boolean;
  onClose: () => void;
  onSave: (toolData: any) => void;
}

const ToolModal = ({ tool, isOpen, isViewMode, onClose, onSave }: ToolModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as File | string | null,
    link: '',
  });

  useEffect(() => {
    if (tool) {
      setFormData(tool);
    } else {
      setFormData({
        title: '',
        description: '',
        image: null,
        link: '',
      });
    }
  }, [tool]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // API HERE: File Upload API here: POST /api/upload-file
    console.log('Tool data with file:', formData);
    
    onSave(formData);
  };

  if (!isOpen) return null;

  if (isViewMode && tool) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Tool Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              {tool.image && (
                <img
                  src={typeof tool.image === 'string' ? tool.image : URL.createObjectURL(tool.image)}
                  alt={tool.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
              <p className="text-gray-300 leading-relaxed">{tool.description}</p>
            </div>

            {tool.link && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Download Link</h4>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  {tool.link} <ExternalLink size={16} />
                </a>
              </div>
            )}
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
            {tool ? 'Edit Tool' : 'Add New Tool'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tool Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tool Image
            </label>
            <FileUpload
              value={formData.image}
              onChange={(file) => setFormData({ ...formData, image: file })}
              accept="image/*"
              placeholder="Upload Tool Image"
              type="image"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Download Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
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
              {tool ? 'Update' : 'Create'} Tool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToolModal;
