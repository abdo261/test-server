const User = require("../models/User");
const Profile = require("../models/Profile");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { POWER_hash, SUCRET_KEY } = require("dotenv").config().parsed;
const {
  formatValidationErrors,
  generateRandomPassword,
  sendSms,
} = require("../utils/tools");
const {
  validateCreateateUser,
  validateLoginUser,
} = require("../validation/auth");

const register = async (req, res) => {
  try {
    const { first_name, last_name, CIN ,phone_number, password_length } = req.body;
    const { error } = validateCreateateUser({ first_name, last_name, CIN, phone_number});
    if (error) { 
      return res.status(400).json(formatValidationErrors(error));
    }
    const email = `${CIN}@gmail.com`;
    const password = generateRandomPassword(password_length || 8);
    const hashPAssword = await bcryptjs.hash(password, +POWER_hash);
    const newUser = new User({ email, password: hashPAssword });
    const saveUser = await newUser.save();
    const newProfile = new Profile({
      first_name,
      last_name,
      CIN,
      phone_number,
      user_id: saveUser._id,
    });
    await newProfile.save();
    sendSms(phone_number,password,email)
    res.status(201).json({
      message: `User ${first_name}_${last_name} created successfely ^_^`,
      user:user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = validateLoginUser({ email, password });
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "email or password incorrect" });
    }
    const passwordMatch = await bcryptjs.compare(password, existUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }
    const token = jwt.sign(
      { _id: existUser._id, is_admin: existUser.is_admin },
      SUCRET_KEY,
      { expiresIn: "1y" }
    );
    res
      .status(201)
      .json({ token, message: "You are connected successfully ^_^" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

const restPassword = async(req,res)=>{
  try {
    //get email from token 
    //check  email user exist
    //check old password 
    // hash new password
    // update the hashed pasword 
  } catch (error) {
    
  }
}
module.exports = { register, loginUser };
