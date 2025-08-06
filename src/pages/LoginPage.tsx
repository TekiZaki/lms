import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const [role, setRole] = useState<"admin" | "guru" | "siswa">("admin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg m-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Aplikasi LMS Sekolah
        </h1>
        <p className="text-center text-gray-500">
          Silakan masuk untuk melanjutkan
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue="pengguna_demo"
                required
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue="123456"
                required
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Masuk sebagai
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "admin" | "guru" | "siswa")
                }
                className="w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="admin">Admin</option>
                <option value="guru">Guru</option>
                <option value="siswa">Siswa / Orang Tua</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
