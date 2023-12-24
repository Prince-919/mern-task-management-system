import React, { useEffect, useState } from "react";
import { TodoBody } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoUpdate from "./TodoUpdate";
import axios from "axios";

let id = sessionStorage.getItem("id");
let toUpdateLists = [];
const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const [list, setList] = useState([]);

  const show = () => {
    let textarea = document.querySelector("#textarea");
    textarea.style.display = "block";
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("All fields are required.");
    } else {
      if (id) {
        await axios
          .post(`${window.location.origin}/api/add-task`, {
            title: inputs.title,
            body: inputs.body,
            id,
          })
          .then((response) => {
            console.log(response);
          });
        setList([...list, inputs]);
        toast.success("Task added successfully.");
      } else {
        setList([...list, inputs]);
        setInputs({
          title: "",
          body: "",
        });
        toast.success("Task added successfully.");
        toast.error("Task added but not saved!, Please Sign up");
      }
    }
  };
  const handleDelete = async (cardId) => {
    if (id) {
      await axios
        .delete(`${window.location.origin}/api/delete-task/${cardId}`, {
          data: { id: id },
        })
        .then(() => {
          toast.success("Task deleted successfully.");
        });
    } else {
      toast.error("Please signup first.");
    }
  };

  const handleUpdatePopup = (value) => {
    let popupScreen = document.getElementById("todo_update");
    popupScreen.style.display = value;
  };

  const handleUpdate = (value) => {
    toUpdateLists = list[value];
  };

  useEffect(() => {
    if (id) {
      const getAllTasks = async () => {
        await axios
          .get(`${window.location.origin}/api/get-tasks/${id}`)
          .then((response) => {
            setList(response.data.list);
          });
      };
      getAllTasks();
    }
  }, [handleSubmit]);
  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="shadow_primary rounded d-flex flex-column w-50 p-1">
            <input
              className="todo_input my-2 p-2"
              type="text"
              placeholder="Title"
              name="title"
              onClick={show}
              value={inputs.title}
              onChange={handleInput}
            />
            <textarea
              id="textarea"
              className="todo_textarea p-2"
              placeholder="Body"
              name="body"
              value={inputs.body}
              onChange={handleInput}></textarea>
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button
              className="btn btn-primary px-3 py-1"
              onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo_body">
          <div className="container-fluid">
            <div className="row">
              {list &&
                list?.map((item, index) => (
                  <div key={item._id} className="col-lg-3 col-10 mx-5 my-2">
                    <TodoBody
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      handleDelete={handleDelete}
                      handleUpdatePopup={handleUpdatePopup}
                      updateId={index}
                      handleUpdate={handleUpdate}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo_update" id="todo_update">
        <div className="container update">
          <TodoUpdate
            handleUpdatePopup={handleUpdatePopup}
            handleUpdate={toUpdateLists}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
