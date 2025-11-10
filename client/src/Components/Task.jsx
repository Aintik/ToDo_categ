import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import LogoutBtn from "./UI/logoutBtn"


const Task = () => {
  let { id } = useParams()
  const [category, setCategory] = useState([]);
  async function fetchCategory() {
    let URL = id ? `/category/one/${id}` : `/category/`;
    const res = await api.get(URL);
    setCategory(res.data);
  }
  async function addTask(event) {
    if (event.code === "Enter") {
      const value = event.target.value.trim();
      if (value.length > 0)
        await api.post(`/category/list/add/${id}`, { title: value });
      event.target.value = "";
      fetchCategory();
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="Task">
      <div className="logoutcontainer">
        <h1>Tasks</h1>
        <LogoutBtn/>
      </div>
      {id && (
        <input type="text" onKeyPress={addTask} placeholder="Add a task" />
      )}

      {category.map((categ) => {
        return (
          <div key={categ._id}>
            {categ.list.map((elem) => {
              return (
                <Item
                  key={elem._id}
                  value={elem}
                  idCateg={categ}
                  refresh={fetchCategory}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Task;
