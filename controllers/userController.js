const Profile = require("../models/Profile");
const User = require("../models/User");
const { formatValidationErrors } = require("../utils/tools");
const { validateUpdateUser } = require("../validation/auth");
const countUser = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    res.status(200).json({ count:usersCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ is_admin: false }).select("-password");
    const profiles = await Profile.find({
      user_id: {
        $in: users.map((u) => u._id),
      },
    });
    const combinedData = users.map((user) => {
      const profile = profiles.find((p) => p.user_id.equals(user._id));
      return { ...user.toObject(), profile: profile.toObject() };
    });
    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const existUser = await User.findById(req.params.id).select("-password");

    if (!existUser) {
      return res.status(404).json({ message: "user note found !" });
    }
    const profile = await Profile.findOne({ user_id: req.params.id });
    res
      .status(200)
      .json({ ...existUser.toObject(), profile: profile.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const existUser = await User.findById(req.params.id);
    if (!existUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const { phone_number, CIN, last_name, first_name } = req.body;
    const { error } = validateUpdateUser({
      phone_number,
      CIN,
      last_name,
      first_name,
    });
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }
    const profile = await Profile.findOneAndUpdate(
      { user_id: req.params.id },
      { phone_number, CIN, last_name, first_name },
      { new: true }
    );

    if (!profile) {
      return res
        .status(404)
        .json({ message: "This user doesn't have any profile!" });
    }

    if (CIN) {
      existUser.email = `${CIN}@gmail.com`;
      await existUser.save();
    }

    res.status(200).json({
      message: "User updated successfully ^_^",
      user: { ...existUser.toObject(), profile: profile.toObject() },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const destroy = async (req, res) => {
  try {
    const existUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!existUser) {
      return res.status(404).json({ message: "user note found !" });
    }
    res.status(201).json({ message: "user deleted successfely" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAllUsers, getOneUser, updateUser, destroy,countUser };
