import { Schema, model, models } from "mongoose";

const PublicationSchema = new Schema(
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

const Publication =
  models.Publication || model("Publication", PublicationSchema);
export default Publication;
