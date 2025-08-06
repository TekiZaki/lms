import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const UsersPage = () => {
  const users = useQuery(api.queries.getUsers);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        Manajemen Pengguna
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Nama</th>
              <th className="p-3">Peran</th>
              <th className="p-3">Kelas / Mapel</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  {user.role === "guru" ? user.subject : user.class || "N/A"}
                </td>
                <td className="p-3">
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm mr-2">
                    Edit
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

export default UsersPage;
