import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface UserModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => void;
  loading?: boolean;
  viewOnly?: boolean;
}

const UserModal = ({
  user,
  isOpen,
  onClose,
  onSave,
  loading = false,
  viewOnly = false,
}: UserModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    job_title: "",
    timezone: "",
    social_work: "",
    tags: [] as string[],
    profile_photo: "",
    address: "",
    company_name: "",
    headline: "",
    tag_details: [] as any[],
    created_posts: [] as any[],
    user_comments: [] as any[],
    language: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username || user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        company: user.company_name || user.company || "",
        job_title: user.job_title || "",
        timezone: user.timezone || "",
        social_work: user.social_work || user.headline || "",
        tags: user.tags || [],
        profile_photo: user.profile_photo || user.profile_pic || "",
        address: user.address || "",
        company_name: user.company_name || "",
        headline: user.headline || "",
        tag_details: user.tag_details || [],
        created_posts: user.created_posts || [],
        user_comments: user.user_comments || [],
        language: user.language || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        company: "",
        job_title: "",
        timezone: "",
        social_work: "",
        tags: [],
        profile_photo: "",
        address: "",
        company_name: "",
        headline: "",
        tag_details: [],
        created_posts: [],
        user_comments: [],
        language: "",
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-md p-8 text-center text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {viewOnly ? "User Details" : user ? "Edit User" : "Add New User"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        {viewOnly ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-6">
              <img
                src={formData.profile_photo || "/placeholder.svg"}
                alt={formData.name}
                className="h-24 w-24 rounded-full object-cover border-2 border-orange-500"
              />
              <div>
                <div className="text-2xl font-bold text-white">
                  {formData.name}
                </div>
                <div className="text-md text-gray-400">
                  {formData.job_title || formData.headline}
                </div>
                <div className="text-sm text-gray-400">
                  {formData.company_name || formData.company}
                </div>
                <div className="text-sm text-gray-400">{formData.language}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <span className="block text-gray-400">Email</span>
                <span className="text-white">{formData.email}</span>
              </div>
              <div>
                <span className="block text-gray-400">Phone</span>
                <span className="text-white">{formData.phone}</span>
              </div>
              <div>
                <span className="block text-gray-400">Location</span>
                <span className="text-white">
                  {formData.address || formData.location}
                </span>
              </div>
              <div>
                <span className="block text-gray-400">Timezone</span>
                <span className="text-white">{formData.timezone}</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="block text-gray-400 mb-1">
                Social Work / Headline
              </span>
              <span className="text-white">{formData.social_work}</span>
            </div>
            {formData.tag_details && formData.tag_details.length > 0 && (
              <div className="mt-4">
                <span className="block text-gray-400 mb-1">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {formData.tag_details.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="bg-orange-500 text-white px-2 py-1 rounded text-xs"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* {formData.created_posts && formData.created_posts.length > 0 && (
              <div className="mt-4">
                <span className="block text-gray-400 mb-1">Created Posts</span>
                <ul className="list-disc list-inside text-white">
                  {formData.created_posts.map((post: any) => (
                    <li key={post.id}>
                      <span className="font-semibold">{post.title}</span>:{" "}
                      {post.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {formData.user_comments && formData.user_comments.length > 0 && (
              <div className="mt-4">
                <span className="block text-gray-400 mb-1">Comments</span>
                <ul className="list-disc list-inside text-white">
                  {formData.user_comments.map((comment: any) => (
                    <li key={comment.id}>{comment.comment_text}</li>
                  ))}
                </ul>
              </div>
            )} */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) =>
                    setFormData({ ...formData, job_title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Social Work Description
              </label>
              <textarea
                value={formData.social_work}
                onChange={(e) =>
                  setFormData({ ...formData, social_work: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
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
                {user ? "Update" : "Create"} User
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserModal;
