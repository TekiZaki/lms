import { NavLink } from "react-router-dom";
import { Home, Users, Book, Award, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/utils";

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
    "flex flex-col items-center justify-center w-full h-full text-gray-500";
  const activeClasses = "text-indigo-600";
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(baseClasses, isActive && activeClasses)}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

const BottomNav = () => {
  const { user } = useAuth();

  if (!user) return null;

  const renderNavItems = () => {
    if (user.role === "admin") {
      return (
        <>
          <NavItem
            to="/dashboard"
            icon={<Home className="w-6 h-6" />}
            label="Home"
          />
          <NavItem
            to="/users"
            icon={<Users className="w-6 h-6" />}
            label="Pengguna"
          />
          <NavItem
            to="/classes"
            icon={<Book className="w-6 h-6" />}
            label="Kelas"
          />
          <NavItem
            to="/account"
            icon={<User className="w-6 h-6" />}
            label="Akun"
          />
        </>
      );
    }
    // Guru & Siswa have similar navs
    return (
      <>
        <NavItem
          to="/dashboard"
          icon={<Home className="w-6 h-6" />}
          label="Home"
        />
        <NavItem
          to="/tasks"
          icon={<Book className="w-6 h-6" />}
          label="Tugas"
        />
        <NavItem
          to="/grades"
          icon={<Award className="w-6 h-6" />}
          label="Nilai"
        />
        <NavItem
          to="/account"
          icon={<User className="w-6 h-6" />}
          label="Akun"
        />
      </>
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center z-10">
      {renderNavItems()}
    </div>
  );
};

export default BottomNav;
