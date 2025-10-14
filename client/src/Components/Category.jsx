import React, { useEffect, useState } from "react";
import ColorPicker from "./UI/ColorPicker/ColorPicker";
import axios from "axios";

const API = "https://todo-categ.onrender.com";

const Category = ({ deleted }) => {
  const [category, setCategory] = useState([]);
  async function fetchCategory() {
    let res = await (await fetch(`${API}/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })).json();
    setCategory(res);
  }
  async function addCategory(event) {
    if (event.code === "Enter") {
      const value = event.target.value.trim();
      if (value.length > 0)
        await axios.post(
          `${API}/category/add`,
          { name: value },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      event.target.value = "";
      fetchCategory();
    }
  }
  function deleteCateg(event) {
    setTimeout(() => {
      axios.get(`${API}/category/delete/${event.target.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCategory();
      window.location.replace("/");
    }, 1050);
  }
  function rew(e) {
    document.querySelectorAll(".tre").forEach((item) => {
      item.style.display = "none";
    });
    e.target.parentElement.parentElement.querySelector(".tre").style.display =
      "flex";
  }
  function rew1(e) {
    document.querySelectorAll(".tre").forEach((item) => {
      item.style.display = "none";
    });
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="Category">
      <h1>Category</h1>
      <input
        type="text"
        onKeyPress={addCategory}
        placeholder="Add a category"
      />
      <ul>
        <li className="allTask">
          <a href="/">
            <div></div> All
          </a>
        </li>
        {category.map((item) => {
          return (
            <li onMouseLeave={rew1} key={item._id}>
              <div className="tre">
                <ColorPicker categId={item._id} refresh={fetchCategory} />
              </div>
              <a
                onMouseDown={deleteCateg}
                href={`/categ/${item._id}`}
                style={{ color: item.color }}
                title="Hold 2sec to delete"
                id={item._id}
              >
                <div
                  onMouseEnter={rew}
                  className="round"
                  style={{ backgroundColor: item.color }}
                ></div>{" "}
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;
