import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css"

function Navbar({ setIsSidebarOpen, isSidebarOpen }) {

    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true })
    }

    return (
        <>
        <nav className="navbar">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>≡</button>
            <h2>Anvaya CRM</h2>
            <button onClick={logoutUser}>Logout</button>
        </nav>
        </>
    )
}

export default Navbar;