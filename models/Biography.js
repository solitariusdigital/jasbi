import { Schema, model, models } from "mongoose";

const BiographySchema = new Schema(
  {
    title: String,
    year: Number,
    description: String,
    category: String,
    group: String,
    media: String,
    mediaType: String,
    tags: String,
    confirm: Boolean,
  },
  { timestamps: true }
);

const Biography = models.Biography || model("Biography", BiographySchema);
export default Biography;
