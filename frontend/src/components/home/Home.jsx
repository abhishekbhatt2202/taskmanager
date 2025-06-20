import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { resolvePath, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(
        "http://localhost:5000/api/tasks/create",
        { email, title }
      );
      console.log(response.data);
      setTasks([...tasks, { title }]);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post("http://localhost:5000/api/tasks/get", {
        email,
      });
      console.log(response.data);
      if (response.data.data.length > 0) {
        const formattedTasks = response.data.data.map((task) => ({
          title: task.title,
        }));
        setTasks(formattedTasks);
        console.log(formattedTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (titleToDelete) => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.delete(
        "http://localhost:5000/api/tasks/delete",
        {
          data: { email, title: titleToDelete },
        }
      );
      console.log(response.data);
      setTasks(tasks.filter((task) => task.title !== titleToDelete));
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (oldTitle) => {
    const updatedTitle = prompt("Edit task title:", oldTitle);
    if (updatedTitle && updatedTitle.trim() !== "") {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.put(
          "http://localhost:5000/api/tasks/put",
          {
            email,
            oldTitle,
            updatedTitle,
          }
        );
        console.log(response.data.data);
        setTasks(
          tasks.map((task) =>
            task.title === oldTitle ? { title: updatedTitle } : task
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getTask();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="home-page">
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>
      <div className="Home-container">
        <div className="Home-wrapper">
          <h1 className="Home-title">Task Manager </h1>

          <div className="Home-input">
            <input
              type="text"
              className="task-input"
              placeholder="Enter New Task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="add-task-button" onClick={addTask}>
              Add Task
            </button>
          </div>

          <div className="task-grid">
            {tasks.map((task) => (
              <div key={task.title} className="task-card">
                <h2 className="task-title">{task.title}</h2>
                <div className="task-action">
                  <button
                    className="edit-button"
                    onClick={() => editTask(task.title)}
                  >
                    ✏️
                  </button>
                  <button
                    className="Delete-button"
                    onClick={() => deleteTask(task.title)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
