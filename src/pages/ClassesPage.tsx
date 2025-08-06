import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const ClassesPage = () => {
  const classes = useQuery(api.queries.getClasses);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        Manajemen Kelas
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Nama Kelas</th>
              <th className="p-3">Wali Kelas</th>
              <th className="p-3">Jumlah Siswa</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {classes?.map((cls) => (
              <tr key={cls._id} className="border-b">
                <td className="p-3">{cls.name}</td>
                <td className="p-3">{cls.homeroomTeacher}</td>
                <td className="p-3">{cls.studentCount}</td>
                <td className="p-3">
                  <button className="text-green-600 hover:text-green-900 text-sm mr-2">
                    Jadwal
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm mr-2">
                    Lihat
                  </button>
                  <button className="text-red-600 hover:text-red-900 text-sm">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesPage;
