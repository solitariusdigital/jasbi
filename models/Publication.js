import { Schema, model, models } from "mongoose";

const PublicationSchema = new Schema(
  {
    title: String,
    author: String,
    description: String,
    year: String,
    publisher: String,
    category: String,
    image: String,
    confirm: Boolean,
    active: Boolean,
  },
  { timestamps: true }
);

const Publication =
  models.Publication || model("Publication", PublicationSchema);
export default Publication;
