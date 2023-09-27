import { Schema, model, models } from "mongoose";

const AcademicSchema = new Schema(
  {
    title: String,
    year: Number,
    description: String,
    category: String,
    image: String,
    confirm: Boolean,
    hidden: Boolean,
  },
  { timestamps: true }
);

const Academic = models.Academic || model("Academic", AcademicSchema);
export default Academic;
