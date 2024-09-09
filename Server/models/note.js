import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    income: {
      required: true,
      type: Number,
    },
    expence: {
      required: true,
      type: Number,
    },
    date: {
      required: true,
      type: String,
    },
    note: {
      required: true,
      type: String,
    },
    user: {
      type: String,
      required: true,
    },
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

const Note = mongoose.model('Note', noteSchema);
export default Note;
