import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  movie_id: { type: String, required: true },
  author: { type: String, required: true },
  author_details: {
    name: { type: String },
    username: { type: String },
    avatar_path: { type: String },
    rating: { type: Number },
  },
  content: { type: String, required: true },
  created_at: { type: String },
  updated_at: { type: String },
  url: { type: String },
});

ReviewSchema.statics.findAll = function () {
  return this.find();
};

export default mongoose.model("Reviews", ReviewSchema);
