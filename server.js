import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import organizationRoutes from './routes/organizationRoutes.js'
import authRoutes from './routes/authRoutes.js'
import parentsRoutes from './routes/parentRoutes.js'

dotenv.config()
const app = express();
app.use(express.json())

const mongoDbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/orgEvent';
const PORT = process.env.PORT || 3000

mongoose.connect(mongoDbUrl)
.then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// routes 
app.use('/api/auth' ,authRoutes)
app.use('/api/organizations' ,organizationRoutes)
app.use('/api/parents' ,parentsRoutes)

app.listen(PORT , () =>{
    console.log(`server listening on port ${PORT}`);
})


