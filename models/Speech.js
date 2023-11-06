import { Schema, model, models } from "mongoose";

const SpeechSchema = new Schema(
  {
    title: String,
    year: Number,
    description: String,
    category: String,
    group: String,
    media: String,
    confirm: Boolean,
  },
  { timestamps: true }
);

const Speech = models.Speech || model("Speech", SpeechSchema);
export default Speech;
