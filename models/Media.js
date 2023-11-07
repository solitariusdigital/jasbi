import { Schema, model, models } from "mongoose";

const MediaSchema = new Schema(
  {
    title: String,
    year: Number,
    description: String,
    group: String,
    media: String,
    mediaType: String,
    confirm: Boolean,
  },
  { timestamps: true }
);

const Media = models.Media || model("Media", MediaSchema);
export default Media;
