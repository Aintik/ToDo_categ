import React from "react";
import "../styles/Item.css";
import bin from "../assets/bin.svg";
import tick from "../assets/tick.svg";
import axios from "axios";
const API = "https://todo-categ.onrender.com";

let a = 0;
const Item = (props) => {
  a++;
  function deleteList() {
    fetch(
      `${API}/category/list/delete/${props.value._id}/of/${props.idCateg._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );
    props.refresh();
  }
  async function sendStatus(e) {
    await axios.post(
      `${API}/category/status/${props.value._id}/of/${props.idCateg._id}`,
      {
        status: e.target.checked,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    props.refresh();
  }

  return (
    <div className="Item">
      <input
        onChange={sendStatus}
        type="checkbox"
        id={`done${a}`}
        defaultChecked={props.value.status}
      />
      <label htmlFor={`done${a}`}>
        <img src={tick} alt="tick" />
      </label>
      <p>{props.value.title}</p>
      <button
        onClick={deleteList}
        style={{ backgroundColor: props.idCateg.color }}
      >
        {props.idCateg.name}
        <div>
          <img src={bin} alt="bin" />{" "}
        </div>
      </button>
    </div>
  );
};

export default Item;
