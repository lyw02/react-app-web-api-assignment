import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  user_id: { type: String, required: true },
  movie_id: { type: Number, required: true },
});

// Compound index
FavoriteSchema.index({ user_id: 1, movie_id: 1 }, { unique: true });

export default mongoose.model('Favorites', FavoriteSchema);
