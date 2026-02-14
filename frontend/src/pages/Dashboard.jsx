import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import api from "../services/api";

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const empRes = await api.get("/employees");
      const attRes = await api.get("/attendance");

      setEmployeeCount(empRes.data.length);
      setAttendanceCount(attRes.data.length);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <h4 className="text-gray-500 text-sm">Total Employees</h4>
        <p className="text-3xl font-semibold mt-2">
          {employeeCount}
        </p>
      </Card>

      <Card>
        <h4 className="text-gray-500 text-sm">
          Total Attendance Records
        </h4>
        <p className="text-3xl font-semibold mt-2">
          {attendanceCount}
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
