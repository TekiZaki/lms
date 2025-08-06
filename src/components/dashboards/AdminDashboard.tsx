import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Users, BookText, School, Server } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon,
  colorClass = "indigo",
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass?: string;
}) => (
  <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <div
      className={`bg-${colorClass}-100 p-3 rounded-full text-${colorClass}-500`}
    >
      {icon}
    </div>
  </div>
);

const AdminDashboard = () => {
  const stats = useQuery(api.queries.getAdminDashboardStats);

  if (!stats) {
    return <div>Memuat data dashboard...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Siswa"
          value={stats.totalSiswa}
          icon={<Users className="w-6 h-6" />}
          colorClass="indigo"
        />
        <StatCard
          title="Total Guru"
          value={stats.totalGuru}
          icon={<BookText className="w-6 h-6" />}
          colorClass="green"
        />
        <StatCard
          title="Jumlah Kelas"
          value={stats.totalKelas}
          icon={<School className="w-6 h-6" />}
          colorClass="yellow"
        />
        <StatCard
          title="Backup Terakhir"
          value="Hari ini, 02:00"
          icon={<Server className="w-6 h-6" />}
          colorClass="blue"
        />
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-xl font-semibold mb-4">Aktivitas Sistem Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Waktu</th>
                <th className="p-3">Pengguna</th>
                <th className="p-3">Aksi</th>
                <th className="p-3">Detail</th>
              </tr>
            </thead>
            <tbody>
              {stats.activities.map((activity, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{activity.time}</td>
                  <td className="p-3">{activity.user}</td>
                  <td className="p-3">{activity.action}</td>
                  <td className="p-3">{activity.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
