import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./index.css";

/*const dummyEmployees = [
  {
    id: 1,
    name: "John Doe",
    tasks: [
      {
        name: "Task 1",
        description: "Description for Task 1",
        assignedTime: "2 hours",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    tasks: [
      {
        name: "Task 2",
        description: "Description for Task 2",
        assignedTime: "3 hours",
      },
    ],
  },
  { id: 3, name: "Alice Johnson", tasks: [] },
];*/

const AdminPanel = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    };

    fetchEmployees();
  }, []);

  const handleAssignTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token);
    try {
      await axios.post('http://localhost:5000/api/tasks', {
        name: taskName,
        description: taskDescription,
        assignedTo: assignedTo,
        time: taskTime
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Task Assigned');
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="employee-list">
        <h2>Employee List</h2>
        {employees.map((employee) => (
          <div key={employee.id} className="employee-item">
            <h3>{employee.name}</h3>
            <ul>
              {employee.tasks.map((task, index) => (
                <li key={index}>
                  <strong>{task.name}</strong>: {task.description} (
                  {task.assignedTime})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="assign-task">
        <h2>Assign Task</h2>
        <select
          onChange={(e) => setSelectedEmployee(Number(e.target.value))}
          value={selectedEmployee}
        >
          <option value="" disabled>
            Select Employee
          </option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assigned Time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        <button onClick={handleAssignTask}>Assign Task</button>
      </div>
    </div>
  );
};

export default AdminPanel;
