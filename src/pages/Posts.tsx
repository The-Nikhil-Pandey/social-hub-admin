import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import PostModal from "../components/PostModal";
import { Search, Trash2, Eye } from "lucide-react";
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
import { toast } from "../hooks/use-toast";
import { getPosts, getPostById, deletePost } from "../api/posts";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<any>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setPosts([]);
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleRowClick = async (post: any) => {
    setLoading(true);
    try {
      const data = await getPostById(post.id);
      setSelectedPost(data);
      setIsModalOpen(true);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch post details",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleDelete = (post: any) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePost = async () => {
    if (!postToDelete) return;
    setLoading(true);
    try {
      await deletePost(postToDelete.id);
      toast({
        title: "Post deleted",
        description: `Post '${postToDelete.title}' deleted successfully!`,
      });
      setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
    setDeleteDialogOpen(false);
    setPostToDelete(null);
    setLoading(false);
  };

  const filteredPosts = posts.filter(
    (post) =>
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
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
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
                        {post.uploads &&
                          post.uploads.length > 0 &&
                          post.uploads[0].image && (
                            <img
                              className="h-12 w-12 rounded-lg object-cover mr-4"
                              src={
                                post.uploads[0].image.startsWith("http")
                                  ? post.uploads[0].image
                                  : `${
                                      import.meta.env.VITE_API_BASE_IMAGE_URL
                                    }${post.uploads[0].image}`
                              }
                              alt={post.title}
                            />
                          )}
                        <div>
                          <div className="text-sm font-medium text-white">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-400 max-w-xs truncate">
                            {post.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={post.profile_photo}
                          alt={post.username}
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">
                            {post.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {post.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">
                        {post.location}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRowClick(post)}
                          className="text-orange-400 hover:text-orange-300"
                          disabled={loading}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          className="text-red-400 hover:text-red-300"
                          disabled={loading}
                        >
                          <Trash2 size={16} />
                        </button>
                        {/* Delete Confirmation Dialog */}
                        <AlertDialog
                          open={deleteDialogOpen}
                          onOpenChange={setDeleteDialogOpen}
                        >
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Post</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete post{" "}
                                <b>{postToDelete?.title}</b>? This action cannot
                                be undone.
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
                                  onClick={confirmDeletePost}
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
