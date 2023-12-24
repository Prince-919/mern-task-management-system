const { User, List } = require("../../models");

const listController = {
  // add task
  async addTask(req, res) {
    try {
      const { title, body, id } = req.body;
      const existingUser = await User.findById(id);
      if (existingUser) {
        const list = new List({ title, body, user: existingUser });
        await list.save();
        existingUser.list.push(list);
        await existingUser.save();

        res.status(200).json({
          list,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  // update task
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, body } = req.body;

      await List.findByIdAndUpdate(
        id,
        {
          title,
          body,
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        message: "task updated successfully.",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  // delete task
  async deleteTask(req, res) {
    try {
      const { id } = req.body;
      const existingUser = await User.findByIdAndUpdate(id, {
        $pull: { list: req.params.id },
      });
      if (existingUser) {
        await List.findByIdAndDelete(req.params.id);
        res.status(200).json({
          message: "task deleted successfully.",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  // get tasks
  async getTasks(req, res) {
    try {
      const list = await List.find({ user: req.params.id }).sort({
        createdAt: -1,
      });
      if (list.length !== 0) {
        res.status(200).json({
          list,
        });
      } else {
        res.status(200).json({
          message: "no tasks.",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};
module.exports = listController;
