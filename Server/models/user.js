import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    email: {
      required: [true, 'email id is required'],
      type: String,
    },
    firstName: {
      required: [true, 'First name is required'],
      type: String,
    },
    lastName: {
      required: [true, 'last name is required'],
      type: String,
    },

    mobileNumber: {
      required: [true, 'mobile number is required'],
      type: Number,
    },
    passWord: {
      required: [true, 'passWord is required'],
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

// userSchema.virtual('note', {
//   ref: 'Note',
//   foreignField: 'user',
//   localField: '_id',
// });

const User = mongoose.model('User', userSchema);
export default User;
