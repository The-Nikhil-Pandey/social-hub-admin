import { X } from "lucide-react";

interface PostModalProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
}

const PostModal = ({ post, isOpen, onClose }: PostModalProps) => {
  if (!isOpen || !post) return null;

  // Helper to fix image URLs
  const fixUrl = (url: string | null | undefined) => {
    if (!url) return "";
    let fixed = url;
    if (
      fixed.startsWith("http://localhost") ||
      fixed.startsWith("https://localhost")
    ) {
      fixed = fixed.replace("localhost", "31.97.56.234");
    }
    if (!/^https?:\/\//.test(fixed)) {
      fixed = `http://31.97.56.234:8000${
        fixed.startsWith("/") ? "" : "/"
      }${fixed}`;
    }
    return fixed;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Post Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span>By {post.username}</span>
              <span>•</span>
              <span>{post.company_name}</span>
              <span>•</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags &&
                post.tags.map((tag: any, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {tag.tag_title}
                  </span>
                ))}
            </div>
          </div>

          {post.uploads && post.uploads.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Media</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.uploads.map((media: any, index: number) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    {media.image && (
                      <img
                        src={fixUrl(media.image)}
                        alt={`Post media ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    {media.video && (
                      <video controls className="w-full h-48 object-cover">
                        <source src={fixUrl(media.video)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">
              Description
            </h4>
            <p className="text-gray-300 leading-relaxed">{post.description}</p>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-lg font-semibold text-white mb-3">
              Author Information
            </h4>
            <div className="flex items-center gap-4">
              <img
                className="h-12 w-12 rounded-full"
                src={fixUrl(post.profile_photo)}
                alt={post.username}
              />
              <div>
                <div className="text-white font-medium">{post.username}</div>
                <div className="text-gray-400">{post.email}</div>
                <div className="text-gray-400">{post.job_title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
