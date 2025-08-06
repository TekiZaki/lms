import { useAuth } from "../hooks/useAuth";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { LogOut } from "lucide-react";

const AccountPage = () => {
  const { user, logout } = useAuth();
  // Re-fetch the full user data based on the ID from auth context
  const currentUser = useQuery(
    api.queries.getUserById,
    user ? { id: user._id } : "skip"
  );

  if (!currentUser) {
    return <div className="p-6">Memuat data akun...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
      <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={`https://i.pravatar.cc/150?u=${currentUser.role}`}
          alt="Avatar"
        />
        <h4 className="text-2xl font-bold mt-4">{currentUser.name}</h4>
        <p className="text-lg text-gray-500 capitalize">{currentUser.role}</p>

        {currentUser.role === "siswa" && (
          <div className="text-left w-full mt-6 space-y-2 border-t pt-4">
            <p>
              <strong>NIS:</strong> {currentUser.nis || "-"}
            </p>
            <p>
              <strong>Kelas:</strong> {currentUser.class || "-"}
            </p>
            <p>
              <strong>Nama Orang Tua:</strong> {currentUser.parentName || "-"}
            </p>
            <p>
              <strong>Kontak Orang Tua:</strong>{" "}
              {currentUser.parentContact || "-"}
            </p>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full sm:w-auto mt-8 flex items-center justify-center px-6 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
