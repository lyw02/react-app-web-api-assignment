import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  user_id: { type: String, required: true },
  movie_id: { type: Number, required: true },
});

// Compound index
FavoriteSchema.index({ user_id: 1, movie_id: 1 }, { unique: true });

FavoriteSchema.statics.findAllByUserId = async function (userId) {
  try {
    return await FavoritesModel.find({ user_id: userId });
  } catch (error) {
    console.error('Error finding favorites:', error.message);
    throw error;
  }
};

export default mongoose.model('Favorites', FavoriteSchema);
