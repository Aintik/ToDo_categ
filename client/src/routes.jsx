import React, { useEffect, useState } from "react";
import ToDoPage from "./Components/ToDoPage";
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import { Routes, Route } from "react-router-dom";

function Router() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ToDoPage />} />
        <Route path="/categ/:id" element={<ToDoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default Router;
