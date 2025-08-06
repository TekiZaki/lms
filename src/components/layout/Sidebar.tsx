import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Home,
  Users,
  Book,
  Award,
  User,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

const NavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => {
  const baseClasses =
    "flex items-center px-4 py-2 rounded-md hover:bg-gray-700";
  const activeClasses = "bg-gray-900";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(baseClasses, isActive && activeClasses)}
    >
      {icon}
      {label}
    </NavLink>
  );
};

const Sidebar = () => {
  const { user, logout } = useAuth();
  const currentUser = useQuery(
    api.queries.getUserById,
    user ? { id: user._id } : "skip"
  );

  const renderMenu = () => {
    if (!user || !currentUser) return null;

    switch (user.role) {
      case "admin":
        return (
          <>
            <NavItem
              to="/dashboard"
              icon={<Home className="w-5 h-5 mr-3" />}
              label="Dashboard"
            />
            <NavItem
              to="/users"
              icon={<Users className="w-5 h-5 mr-3" />}
              label="Pengguna"
            />
            <NavItem
              to="/classes"
              icon={<Book className="w-5 h-s mr-3" />}
              label="Kelas & Mapel"
            />
            <NavItem
              to="/grades"
              icon={<Award className="w-5 h-5 mr-3" />}
              label="Semua Nilai"
            />
          </>
        );
      case "guru":
        return (
          <>
            <NavItem
              to="/dashboard"
              icon={<Home className="w-5 h-5 mr-3" />}
              label="Dashboard"
            />
            <NavItem
              to="/tasks"
              icon={<Book className="w-5 h-5 mr-3" />}
              label="Tugas & Ujian"
            />
            <NavItem
              to="/grades"
              icon={<Award className="w-5 h-5 mr-3" />}
              label="Nilai Siswa"
            />
            <NavItem
              to="/students"
              icon={<Users className="w-5 h-5 mr-3" />}
              label="Daftar Siswa"
            />
            <NavItem
              to="/forum"
              icon={<MessageSquare className="w-5 h-5 mr-3" />}
              label="Forum Diskusi"
            />
          </>
        );
      case "siswa":
        return (
          <>
            <NavItem
              to="/dashboard"
              icon={<Home className="w-5 h-5 mr-3" />}
              label="Dashboard"
            />
            <NavItem
              to="/tasks"
              icon={<Book className="w-5 h-5 mr-3" />}
              label="Tugas Saya"
            />
            <NavItem
              to="/grades"
              icon={<Award className="w-5 h-5 mr-3" />}
              label="Nilai Saya"
            />
            <NavItem
              to="/forum"
              icon={<MessageSquare className="w-5 h-5 mr-3" />}
              label="Forum Diskusi"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex-col flex-shrink-0 hidden md:flex">
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-700">
        <span className="text-xl font-bold">LMS Sekolah</span>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {renderMenu()}
        <div className="border-t border-gray-700 mt-4 pt-4">
          <NavItem
            to="/account"
            icon={<User className="w-5 h-5 mr-3" />}
            label="Akun Saya"
          />
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 rounded-md hover:bg-red-800 text-red-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Keluar
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
