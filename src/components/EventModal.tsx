import { useState, useEffect } from "react";
import { X } from "lucide-react";
import FileUpload from "./FileUpload";

interface EventModalProps {
  event: any;
  isOpen: boolean;
  isViewMode: boolean;
  onClose: () => void;
  onSave: (eventData: any) => void;
}

const EventModal = ({
  event,
  isOpen,
  isViewMode,
  onClose,
  onSave,
}: EventModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    location_url: "",
    event_link: "",
    event_tags: [] as string[],
    image: null as File | string | null,
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        location_url: "",
        event_link: "",
        event_tags: [],
        image: null,
      });
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The API expects event_image, not image
    const submitData: any = { ...formData };
    if (formData.image) {
      submitData.event_image = formData.image;
    }
    delete submitData.image;
    onSave(submitData);
  };

  if (!isOpen) return null;

  if (isViewMode && event) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Event Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              {event.image && (
                <img
                  src={
                    typeof event.image === "string"
                      ? event.image
                      : URL.createObjectURL(event.image)
                  }
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-2xl font-bold text-white mb-2">
                {event.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span>{event.date}</span>
                <span>•</span>
                <span>{event.time}</span>
                <span>•</span>
                <span>{event.location}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                Description
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>

            {event.event_link && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Event Link
                </h4>
                <a
                  href={event.event_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300"
                >
                  {event.event_link}
                </a>
              </div>
            )}

            {event.event_tags.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {event.event_tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {event ? "Edit Event" : "Add New Event"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Event Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, location_url: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Event Link
            </label>
            <input
              type="url"
              value={formData.event_link}
              onChange={(e) =>
                setFormData({ ...formData, event_link: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Event Image
            </label>
            <FileUpload
              value={formData.image}
              onChange={(file) => setFormData({ ...formData, image: file })}
              accept="image/*"
              placeholder={
                formData.image ? "Change Event Image" : "Upload Event Image"
              }
              type="image"
            />
            {/* Show preview if image is a string (URL) and not a File */}
            {typeof formData.image === "string" && formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Event Preview"
                  className="w-24 h-24 object-cover rounded border border-gray-600"
                />
              </div>
            )}
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
              {event ? "Update" : "Create"} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
