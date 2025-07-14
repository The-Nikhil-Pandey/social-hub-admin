import {
  Bell,
  Moon,
  Sun,
  Menu,
  User,
  Settings,
  LogOut,
  Key,
} from "lucide-react";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

interface TopBarProps {
  onToggleSidebar: () => void;
}

const TopBar = ({ onToggleSidebar }: TopBarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:block">
              <h2 className="text-xl font-semibold text-white">Dashboard</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
            </button> */}

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-white hidden md:block">Admin User</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowChangePassword(true);
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <Key size={16} />
                      Change Password
                    </button>
                    {/* <button className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      <Settings size={16} />
                      Settings
                    </button> */}
                    <hr className="border-gray-700 my-2" />
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
};

export default TopBar;
