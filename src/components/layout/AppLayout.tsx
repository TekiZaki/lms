import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

const AppLayout = () => {
  return (
    <div className="relative flex h-full overflow-hidden bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        {/* Scrollable content area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto pb-20 md:pb-6">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
