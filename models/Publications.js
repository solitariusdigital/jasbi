import { Schema, model, models } from "mongoose";

const PublicationsSchema = new Schema(
  {
    title: String,
    author: String,
    description: String,
    publication: String,
    shabak: String,
    category: String,
    image: String,
    confirm: Boolean,
    hide: Boolean,
  },
  { timestamps: true }
);

const Publications =
  models.Publications || model("Publications", PublicationsSchema);
export default Publications;
