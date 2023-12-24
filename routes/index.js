const express = require("express");
const {
  registerController,
  loginController,
  listController,
} = require("../controllers");

const router = express.Router();

// auth
router.post("/register", registerController.register);
router.post("/login", loginController.login);

// list
router.post("/add-task", listController.addTask);
router.put("/update-task/:id", listController.updateTask);
router.delete("/delete-task/:id", listController.deleteTask);
router.get("/get-tasks/:id", listController.getTasks);

module.exports = router;
