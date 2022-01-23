import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }
  if (!process.env.DB_URI){
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`🚀Listening on port ${process.env.SERVER_PORT}!`);
  });
}

start();