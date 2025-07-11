
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import PostModal from '../components/PostModal';
import { Search, Trash2, Eye } from 'lucide-react';

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // API HERE: Fetch Posts
  const dummyPosts = [
    {
      id: "p1",
      title: "Supporting the Elderly",
      description: "Tips on improving senior care in remote areas. This comprehensive guide covers various aspects of elderly care including medical support, emotional wellness, and community engagement.",
      tags: ["Elderly Support"],
      media: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"],
      author: {
        name: "Simran Kaur",
        email: "simran@example.com",
        profile_pic: "https://images.unsplash.com/photo-1494790108755-2616b7b2ba5d?w=100&h=100&fit=crop&crop=face"
      },
      location: "Delhi",
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: "p2", 
      title: "Mental Health Awareness",
      description: "Breaking the stigma around mental health in rural communities. A detailed exploration of mental health challenges and solutions.",
      tags: ["Mental Health"],
      media: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"],
      author: {
        name: "Aarav Mehta",
        email: "aarav@example.com", 
        profile_pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      location: "Mumbai",
      created_at: "2024-01-14T15:45:00Z"
    }
  ];

  const handleRowClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (postId: string) => {
    // API HERE: Delete Post
    console.log('Delete post:', postId);
  };

  const filteredPosts = dummyPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Posts</h1>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search posts..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Post</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {post.media && post.media[0] && (
                          <img
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                            src={post.media[0]}
                            alt={post.title}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-white">{post.title}</div>
                          <div className="text-sm text-gray-400 max-w-xs truncate">{post.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={post.author.profile_pic}
                          alt={post.author.name}
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">{post.author.name}</div>
                          <div className="text-sm text-gray-400">{post.author.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{post.location}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRowClick(post)}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
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

        {isModalOpen && selectedPost && (
          <PostModal
            post={selectedPost}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Posts;
