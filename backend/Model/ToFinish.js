const mongoose = require("mongoose");
const finishSchema = mongoose.Schema(
  {
    department: {
      type: String,
      required: [true, "Please enter department"],
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
    },
    techId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("finish", finishSchema);
