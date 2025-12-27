import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  product: String,
  message: String,
  source: String,

  intent: {
    type: String,
    enum: ["high", "medium", "low"],
  },
  category: String,
  urgency: String,

  status: {
    type: String,
    enum: ["new", "contacted", "converted", "lost"],
    default: "new",
  },

  lastActionAt: Date,
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);
