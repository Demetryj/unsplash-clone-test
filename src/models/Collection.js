import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [{ type: String }],
});

export default mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);
