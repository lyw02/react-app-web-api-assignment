import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  author: { type: String },
  author_details: {
    name: { type: String },
    username: { type: String },
    avatar_path: { type: String },
    rating: { type: Number },
  },
  content: { type: String },
  created_at: { type: String },
  id: { type: String },
  updated_at: { type: String },
  url: { type: String },
});

ReviewSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model("Reviews", ReviewSchema);
