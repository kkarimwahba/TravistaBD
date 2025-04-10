import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String }, // e.g., "holidays"
});

export default mongoose.model("Tag", tagSchema);
