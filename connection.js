import mongoose from 'mongoose';

  async function connectMongoDb(url) {
    try {
        const conn = await mongoose.connect(url);
        console.log('MongoDB connected' );
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectMongoDb
