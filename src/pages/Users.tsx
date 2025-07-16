import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import UserModal from "../components/UserModal";
import { Plus, Search, Eye, Trash2 } from "lucide-react";
import { getUsers, getUserById, deleteUser } from "../api/users";
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
import { toast } from "../hooks/use-toast";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const handleDeleteUser = (user: any) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    setLoading(true);
    try {
      await deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      toast({
        title: "User deleted",
        description: `User '${
          userToDelete.username || userToDelete.name
        }' has been deleted successfully!`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
    setDeleteDialogOpen(false);
    setUserToDelete(null);
    setLoading(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleViewUser = async (userId: number) => {
    setModalLoading(true);
    try {
      const user = await getUserById(userId);
      setSelectedUser(user);
      setIsModalOpen(true);
    } catch (err) {
      setSelectedUser(null);
      setIsModalOpen(false);
    }
    setModalLoading(false);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Users</h1>
          {/* <button
            onClick={handleAddUser}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add User
          </button> */}
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
                placeholder="Search users..."
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
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-8">
                      Loading...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-8">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              user.profile_photo ||
                              user.profile_pic ||
                              "/placeholder.svg"
                            }
                            alt={user.username || user.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {user.username || user.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {user.job_title || user.headline}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{user.email}</div>
                        <div className="text-sm text-gray-400">
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-white">
                          {user.address || user.location}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-white">
                          {user.company_name || user.company}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-orange-400 hover:text-orange-300"
                            title="View"
                            onClick={() => handleViewUser(user.id)}
                            disabled={modalLoading}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="text-red-400 hover:text-red-300"
                            title="Delete"
                            onClick={() => handleDeleteUser(user)}
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
                                <AlertDialogTitle>Delete User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete user{" "}
                                  <b>
                                    {userToDelete?.username ||
                                      userToDelete?.name}
                                  </b>
                                  ? This action cannot be undone.
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
                                    onClick={confirmDeleteUser}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <UserModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={(userData) => {
              // API HERE: Save/Update User
              setIsModalOpen(false);
            }}
            loading={modalLoading}
            viewOnly={!!selectedUser}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
