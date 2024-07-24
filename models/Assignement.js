const { Schema, model } = require("mongoose");
const AssingnementSchema = new Schema(
  {
    users_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    task_id: {
      type: Schema.Types.ObjectId,
      ref: "task",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("assignement", AssingnementSchema);
