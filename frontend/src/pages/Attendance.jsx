import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import api from "../services/api";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Attendance
  const handleDeleteAttendance = async (id) => {
    
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this attendance record?"
  );

  if (!confirmDelete) return;
  try {
    await api.delete(`/attendance/${id}`);

    // instant UI update
    setRecords((prev) => prev.filter((rec) => rec.id !== id));
  } catch (err) {
    console.error(err);
    setError("Failed to delete attendance.");
  }
};


  // Fetch Attendance
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await api.get("/attendance");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("/attendance", formData);

      setFormData({
        employee_id: "",
        date: "",
        status: "Present",
      });

      fetchAttendance();
    } catch (err) {
      console.error(err);
      setError("Failed to mark attendance.");
    }
  };

  return (
    <div className="space-y-6">

      {/* MARK ATTENDANCE FORM */}
      <Card>
        <h3 className="text-lg font-semibold mb-6">
          Mark Attendance
        </h3>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">

          <select
            value={formData.employee_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                employee_id: Number(e.target.value),
              })
            }
            className="border p-2 rounded"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="border p-2 rounded"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <div className="col-span-3">
            <Button type="submit">Mark Attendance</Button>
          </div>
        </form>
      </Card>

      {/* ATTENDANCE TABLE */}
      <Card>
        <h3 className="text-lg font-semibold mb-6">
          Attendance Records
        </h3>

        {loading ? (
          <Loader />
        ) : records.length === 0 ? (
          <EmptyState message="No attendance records found." />
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Employee ID</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>

              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td className="p-3 border">{rec.employee_id}</td>
                  <td className="p-3 border">{rec.date}</td>
                  <td className="p-3 border">{rec.status}</td>
                    <td className="p-3 border">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteAttendance(rec.id)}>
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

export default Attendance;
