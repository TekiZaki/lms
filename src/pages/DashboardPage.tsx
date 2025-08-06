import { useAuth } from "../hooks/useAuth";
import AdminDashboard from "../components/dashboards/AdminDashboard";
// Placeholders for other dashboards
// import TeacherDashboard from '../components/dashboards/TeacherDashboard';
// import StudentDashboard from '../components/dashboards/StudentDashboard';

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return <div className="p-6">Memuat data pengguna...</div>;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "guru":
      return (
        <div className="p-6 bg-white rounded-lg shadow">
          <h1>Dashboard Guru</h1>
          <p>Konten dashboard untuk guru akan ada di sini.</p>
        </div>
      );
    case "siswa":
      return (
        <div className="p-6 bg-white rounded-lg shadow">
          <h1>Dashboard Siswa</h1>
          <p>Konten dashboard untuk siswa akan ada di sini.</p>
        </div>
      );
    default:
      return <div className="p-6">Peran pengguna tidak dikenali.</div>;
  }
};

export default DashboardPage;
