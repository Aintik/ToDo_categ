import React, { useEffect, useState } from "react";
import ToDoPage from "./Components/ToDoPage";
import { Routes, Route } from "react-router-dom";

function Router() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ToDoPage />} />
        <Route path="/categ/:id" element={<ToDoPage />} />

      </Routes>
    </>
  );
}

export default Router;
