const Assignement = require("../models/Assignement");

const countAssingnement = async (req, res) => {
  try {
    const assignementCount = await Assignement.countDocuments();
    res.status(200).json({ count: assignementCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const create = async (req, res) => {
  try {
    const { users_id, task_id } = req.body;
    const newAssignement = new Assignement({
      users_id,
      task_id,
    });
    await newAssignement.save();
    res
      .status(201)
      .json({
        message: "Assignement created successfully",
        assignement: newAssignement,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { users_id, task_id } = req.body;
    const assignement = await Assignement.findByIdAndUpdate(
      id,
      { users_id, task_id },
      { new: true }
    );
    if (!assignement) {
      return res.status(404).json({ message: "Assignement not found" });
    }
    res.json({ message: "Assignement updated successfully", assignement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAssignement = await Assignement.findByIdAndDelete(id);
    if (!deletedAssignement) {
      return res.status(404).json({ message: "Assignement not found" });
    }
    res.json({
      message: "Assignement deleted successfully",
      assignement: deletedAssignement,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const assignements = await Assignement.find().populate("users_id task_id");
    res.status(200).json(assignements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, update, destroy, getAll,countAssingnement };
