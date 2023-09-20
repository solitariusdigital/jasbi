import { Schema, model, models } from "mongoose";

const PoliticSchema = new Schema(
  {
    title: String,
    year: String,
    position: String,
    description: String,
    category: String,
    period: String,
    image: String,
    confirm: Boolean,
    hide: Boolean,
  },
  { timestamps: true }
);

const Politic = models.Politic || model("Politic", PoliticSchema);
export default Politic;
