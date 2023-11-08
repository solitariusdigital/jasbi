import { Schema, model, models } from "mongoose";

const PublicationSchema = new Schema(
  {
    title: String,
    author: String,
    description: String,
    year: Number,
    publisher: String,
    category: String,
    group: String,
    media: String,
    mediaType: String,
    tags: String,
    confirm: Boolean,
  },
  { timestamps: true }
);

const Publication =
  models.Publication || model("Publication", PublicationSchema);
export default Publication;
