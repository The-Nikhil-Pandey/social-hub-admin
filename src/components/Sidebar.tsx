import { NavLink } from 'react-router-dom';
import { 
  BarChart3,
  Users, 
  Tags, 
  FileText, 
  Calendar, 
  FolderOpen, 
  Wrench, 
  GraduationCap, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Tags, label: 'Tags', path: '/tags' },
    { icon: FileText, label: 'Posts', path: '/posts' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: FolderOpen, label: 'Directories', path: '/directories' },
    { icon: Wrench, label: 'Tools', path: '/tools' },
    { icon: GraduationCap, label: 'Courses', path: '/courses' },
    { icon: AlertTriangle, label: 'Reports', path: '/reports' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h1 className="text-white font-bold text-lg">CUSP Admin</h1>
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-white p-1 rounded"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
