import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
}
