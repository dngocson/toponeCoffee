import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="bg-[#eee]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
