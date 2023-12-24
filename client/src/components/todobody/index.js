import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
const TodoBody = ({
  title,
  body,
  id,
  handleDelete,
  handleUpdatePopup,
  updateId,
  handleUpdate,
}) => {
  return (
    <div className="todo_card p-3 shadow_primary rounded">
      <div>
        <h1>{title}</h1>
        <p>{body.split("", 32)}...</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="edit_icon d-flex align-items-center gap-1"
          onClick={() => {
            handleUpdatePopup("block");
            handleUpdate(updateId);
          }}>
          <RiEditBoxFill /> <span>Update</span>
        </div>
        <div
          className="delete_icon d-flex align-items-center gap-1"
          onClick={() => {
            handleDelete(id);
          }}>
          <AiFillDelete /> <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default TodoBody;
