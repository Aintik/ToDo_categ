import React, { useEffect, useState } from "react";
import Item from "./Item";
import axios from "axios";
import { useParams } from "react-router-dom";
const API = "https://todo-categ.onrender.com";

const Task = () => {
  let { id } = useParams()
  const [category, setCategory] = useState([]);
  async function fetchCategory() {
    let URL = id ? `${API}/category/one/${id}` : `${API}/category/`;
    let res = await (await fetch(URL)).json();
    setCategory(res);
  }
  async function addTask(event) {
    if (event.code === "Enter") {
      const value = event.target.value.trim();
      if (value.length > 0)
        await axios.post(`${API}/category/list/add/${id}`, {
          title: value,
        });
      event.target.value = "";
      fetchCategory();
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="Task">
      <h1>Tasks</h1>
      {id && (
        <input type="text" onKeyPress={addTask} placeholder="Add a task" />
      )}

      {category.map((categ) => {
        return (
          <div key={categ._id}>
            {categ.list.map((elem) => {
              return (
                <Item key={elem._id} value={elem} idCateg={categ} refresh={fetchCategory} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Task;
