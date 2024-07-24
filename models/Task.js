const { Schema, model } = require("mongoose");
const TaskSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 3,
    },
    is_done: {
      type: Boolean,
      default: false,
    },
    start_at: {
      type: Date,
      default: null,
    },
    finish_at: {
      type: Date,
      default: null,
    },
    assignement: {
      type: Schema.Types.ObjectId,
      ref: "assignement",
      default:null
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("task", TaskSchema);
