import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Layout.css";

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app-layout">

            <Navbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <Sidebar
                isSidebarOpen={isSidebarOpen}
            />

            <main
                className={
                    isSidebarOpen
                        ? "main-content sidebar-open"
                        : "main-content"
                }
            >
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;