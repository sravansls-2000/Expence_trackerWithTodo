import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('database connected ');
  } catch (error) {
    console.log('databse connection error', error);
  }
};

export default Connection;
