import mongoose from 'mongoose';

const photoSchema = mongoose.Schema(
  {
    myPhoto: { type: String },
    userID: { type: String },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    timestamp: true,
  }
);

const Photo = mongoose.model('photo', photoSchema);
export default Photo;
