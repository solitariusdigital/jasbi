import { Schema, model, models } from "mongoose";

const PoliticSchema = new Schema(
  {
    title: String,
    year: Number,
    position: String,
    description: String,
    category: String,
    group: String,
    activity: String,
    image: String,
    confirm: Boolean,
  },
  { timestamps: true }
);

const Politic = models.Politic || model("Politic", PoliticSchema);
export default Politic;
