import { Schema, model, models } from "mongoose";

const AcademicSchema = new Schema(
  {
    title: String,
    year: String,
    description: String,
    category: String,
    image: String,
    confirm: Boolean,
    hide: Boolean,
  },
  { timestamps: true }
);

const Academic = models.Academic || model("Academic", AcademicSchema);
export default Academic;
