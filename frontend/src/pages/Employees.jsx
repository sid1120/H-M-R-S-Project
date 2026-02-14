import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import EmployeeForm from "../components/employee/EmployeeForm";
import api from "../services/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);

      await api.delete(`/employees/${id}`);

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));

    } catch (err) {
      console.error("Delete Error:", err);
      setError("Failed to delete employee.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <EmployeeForm refresh={fetchEmployees} />

      <Card>
        <h3 className="text-lg font-semibold mb-6">Employee List</h3>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        {/* 🔥 Loading UI */}
        {loading ? (
          <Loader />
        ) : employees.length === 0 ? (
          <EmptyState message="No employees found." />
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Employee ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="p-3 border">{emp.employee_id}</td>
                  <td className="p-3 border">{emp.full_name}</td>
                  <td className="p-3 border">{emp.email}</td>
                  <td className="p-3 border">{emp.department}</td>
                  <td className="p-3 border">
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default Employees;
