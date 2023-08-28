import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScroolToTop";
function AppLayout() {
  return (
    <div className="bg-[#ffffff]">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
