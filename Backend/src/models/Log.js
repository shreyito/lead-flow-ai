import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true, 
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    message: {
      type: String,
    },
    meta: {
      type: Object, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Log", logSchema);
