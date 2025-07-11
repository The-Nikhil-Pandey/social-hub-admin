
import { Bell, Moon, Sun, Menu, User } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  onToggleSidebar: () => void;
}

const TopBar = ({ onToggleSidebar }: TopBarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
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
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-white hidden md:block">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
