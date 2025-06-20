import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/salesApp-db');
    console.log('Connected to database - salesApp-db');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1); 
  }
};

export default connectDB;
