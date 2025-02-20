import { Schema, model, models } from "mongoose";

const AcademicSchema = new Schema(
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

const Academic = models.Academic || model("Academic", AcademicSchema);
export default Academic;
