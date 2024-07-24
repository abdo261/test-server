const { Schema, model } = require("mongoose");
const ProfileSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 3,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 3,
    },
    image: {
      type: String,
      default: null,
    },
    CIN: {
      type: String,
      required: true,
      match: /^[A-Z]{1,2}[0-9]{5,6}$/,
      unique: true,
      minlength: 7,
      maxlength: 8,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    phone_number : {
      type :String ,
      required :true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ProfileSchema.virtual("user_name").get(function () {
  return `${this.first_name}_${this.last_name}`;
});
module.exports = model("profile", ProfileSchema);
