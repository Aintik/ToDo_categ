import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import Category from "./Category";
import axios from "axios";

const API = "https://todo-categ.onrender.com";

const ToDoPage = async () => {
  const navigate = useNavigate();
  await fetch(`${API}`)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="ToDoPage">
      <Category />
      <Task />
    </div>
  );
};

export default ToDoPage;
