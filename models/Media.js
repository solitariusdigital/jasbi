import { Schema, model, models } from "mongoose";

const MediaSchema = new Schema(
  {
    title: String,
    year: String,
    description: String,
    category: String,
    media: String,
    confirm: Boolean,
    active: Boolean,
  },
  { timestamps: true }
);

const Media = models.Media || model("Media", MediaSchema);
export default Media;
