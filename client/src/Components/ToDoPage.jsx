import React, { useState } from "react";
import Task from "./Task";
import Category from "./Category";

const ToDoPage = (props) => {
  return (
    <div className="ToDoPage">
      <Category />
      <Task />
    </div>
  );
};

export default ToDoPage;
