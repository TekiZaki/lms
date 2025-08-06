import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

const getPageTitle = (pathname: string) => {
  const path = pathname.split("/").pop() || "dashboard";
  switch (path) {
    case "dashboard":
      return "Dashboard";
    case "users":
      return "Manajemen Pengguna";
    case "classes":
      return "Manajemen Kelas & Mapel";
    case "tasks":
      return "Tugas";
    case "grades":
      return "Nilai";
    case "account":
      return "Akun Saya";
    default:
      return "LMS Sekolah";
  }
};

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();

  const pageTitle = getPageTitle(location.pathname);

  if (!user) return null;

  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 bg-white border-b">
      {/* Placeholder for layout balance on mobile where a hamburger might be */}
      <div className="w-8 md:hidden"></div>

      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
        {pageTitle}
      </h2>

      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline text-gray-600">
          Selamat datang, <strong>{user.name}</strong>!
        </span>
        <img
          className="w-10 h-10 rounded-full"
          src={`https://i.pravatar.cc/150?u=${user.role}`}
          alt="Avatar"
        />
      </div>
    </header>
  );
};

export default Header;
