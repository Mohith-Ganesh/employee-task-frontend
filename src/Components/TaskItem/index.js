import React, { useState } from "react";

const TaskItem = ({ task }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleStartStop = () => {
    if (isStarted) {
      const stopTime = new Date();
      setElapsedTime(Math.floor((stopTime - startTime) / 1000));
      setIsStarted(false);
    } else {
      setStartTime(new Date());
      setElapsedTime(0);
      setIsStarted(true);
    }
  };

  return (
    <div className="task-item">
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <p>Assigned Time: {task.time}</p>
      <button
        className={isStarted ? "stop" : "start"}
        onClick={handleStartStop}
      >
        {isStarted ? "Stop" : "Start"}
      </button>
      {elapsedTime > 0 && <p>Time Spent: {elapsedTime} seconds</p>}
    </div>
  );
};

export default TaskItem;
