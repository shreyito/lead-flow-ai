import { Schema, model, models } from "mongoose"

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    product: { type: String, required: true },
    message: { type: String },
    source: { type: String },
    intent: { type: String },
    category: { type: String },
    urgency: { type: String, enum: ["low", "medium", "high"] },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
)

export const Lead = models.Lead || model("Lead", leadSchema)
