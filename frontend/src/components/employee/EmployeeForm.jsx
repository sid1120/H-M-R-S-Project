import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import api from "../../services/api";

const EmployeeForm = ({ refresh }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.employeeId ||
      !formData.fullName ||
      !formData.email ||
      !formData.department
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Convert camelCase → snake_case
      await api.post("/employees", {
        employee_id: formData.employeeId,
        full_name: formData.fullName,
        email: formData.email,
        department: formData.department,
      });

      // reset form
      setFormData({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });

      refresh();
    } catch (err) {
      console.error(err);

      // 🔥 Safe error parsing
      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(detail.map((d) => d.msg).join(", "));
      } else {
        setError(detail || "Failed to add employee.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-6">
        Add New Employee
      </h3>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-1">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="col-span-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Employee"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EmployeeForm;



