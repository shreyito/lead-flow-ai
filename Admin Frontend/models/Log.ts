import { Schema, model, models } from "mongoose"

const logSchema = new Schema(
  {
    type: { type: String, required: true },
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
    message: { type: String, required: true },
  },
  { timestamps: true },
)

export const Log = models.Log || model("Log", logSchema)
