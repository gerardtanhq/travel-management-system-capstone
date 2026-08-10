import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? 'nav-link active-nav' : 'nav-link'
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive ? 'nav-link active-nav' : 'nav-link'
                }
            >
                About
            </NavLink>
        </nav>
    );
}