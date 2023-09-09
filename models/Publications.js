import { Schema, model, models } from "mongoose";

const PublicationsSchema = new Schema(
  {
    title: String,
    image: String,
    description: String,
    author: String,
    type: String,
    publication: String,
    shabak: String,
    confirm: Boolean,
    hide: Boolean,
  },
  { timestamps: true }
);

const Publications =
  models.Publications || model("Publications", PublicationsSchema);
export default Publications;
