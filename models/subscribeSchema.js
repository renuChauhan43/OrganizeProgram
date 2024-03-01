import mongoose from 'mongoose';

const subscribeSchema = new mongoose.Schema({
  subscribedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
}, { timestamps: true });

export default mongoose.model('Subscribe', subscribeSchema);
