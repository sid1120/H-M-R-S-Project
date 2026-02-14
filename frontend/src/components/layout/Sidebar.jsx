import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    `block px-4 py-2 text-sm font-medium rounded ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6">
      <h1 className="text-xl font-semibold mb-8">HRMS</h1>

      <nav className="space-y-2">
        <NavLink to="/" className={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/employees" className={linkStyle}>
          Employees
        </NavLink>
        <NavLink to="/attendance" className={linkStyle}>
          Attendance
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
