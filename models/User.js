const { Schema, model } = require("mongoose");
const Profile = require("./Profile");
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 8,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.pre("findOneAndDelete", async function (next) {
  const user_id = this.getQuery()._id;
  await Profile.findOneAndDelete({ user_id: user_id });
  next();
});

module.exports = model("user", UserSchema);
