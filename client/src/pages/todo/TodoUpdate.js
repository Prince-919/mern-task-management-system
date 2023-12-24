import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TodoUpdate = ({ handleUpdatePopup, handleUpdate }) => {
  useEffect(() => {
    setInputs({
      title: handleUpdate.title,
      body: handleUpdate.body,
    });
  }, [handleUpdate]);
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async () => {
    await axios
      .put(`${window.location.origin}/update-task/${handleUpdate._id}`, inputs)
      .then((response) => {
        toast.success("Task updated successfully.");
      });
    handleUpdatePopup("none");
  };
  return (
    <div className="p-5  d-flex justify-content-center align-items-start flex-column update popup">
      <h1>Update Your Task</h1>
      <input
        type="text"
        className="custom_input update_input my-4 p-3 w-100"
        placeholder="write new title..."
        name="title"
        value={inputs.title}
        onChange={handleInput}
      />
      <textarea
        className="custom_input update_input p-3 w-100"
        placeholder="write new body..."
        name="body"
        value={inputs.body}
        onChange={handleInput}
      />

      <div>
        <button className="btn btn-primary my-4 " onClick={handleSubmit}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => {
            handleUpdatePopup("none");
          }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoUpdate;
