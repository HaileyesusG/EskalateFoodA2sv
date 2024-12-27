const mongoose = require("mongoose");
const finishSchema = mongoose.Schema(
  {
    isChecked: { type: Boolean, default: false },
    amount: {
      type: Number,
      default: 0,
    },
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
