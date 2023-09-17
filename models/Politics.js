import { Schema, model, models } from "mongoose";

const PoliticsSchema = new Schema(
  {
    title: String,
    year: String,
    position: String,
    description: String,
    category: String,
    period: String,
    image: String,
    confirm: Boolean,
    hide: Boolean,
  },
  { timestamps: true }
);

const Politics = models.Politics || model("Politics", PoliticsSchema);
export default Politics;
