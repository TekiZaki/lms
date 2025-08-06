import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
    <h1 className="text-6xl font-bold text-indigo-600">404</h1>
    <h2 className="text-2xl font-semibold mt-4 text-gray-800">
      Halaman Tidak Ditemukan
    </h2>
    <p className="text-gray-500 mt-2">
      Maaf, halaman yang Anda cari tidak ada.
    </p>
    <Link
      to="/dashboard"
      className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
    >
      Kembali ke Dashboard
    </Link>
  </div>
);

export default NotFoundPage;
