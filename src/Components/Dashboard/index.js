import React, { useState, useEffect } from "react";
import axios from 'axios';
import TaskItem from "../TaskItem";
import "./index.css";

/*const tasks = [
  {
    id: 1,
    name: "Task 1",
    description: "Description for Task 1",
    assignedTime: "2 hours",
  },
  {
    id: 2,
    name: "Task 2",
    description: "Description for Task 2",
    assignedTime: "3 hours",
  },
  {
    id: 3,
    name: "Task 3",
    description: "Description for Task 3",
    assignedTime: "1 hour",
  },
];*/

const Dashboard = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, []);


  return (
    <div className="App">
      <div className="dashboard">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
