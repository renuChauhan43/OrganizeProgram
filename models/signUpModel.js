import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const signupSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true , 'firstname is required']
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: [true , 'email is required'], 
  },
  phonenumber: {
    type: String,
    required: [true , 'password is required'], 
  },
  type: {
    type: String,
    enum: ['organization', 'parent'],
    required: [true , 'type is required']
  },
  password: {
    type: String,
    required: [true , 'password is required']
  }
});

// middleware
signupSchema.pre("save", async function () {
    if(!this.isModified) return 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  // compare the password
  signupSchema.methods.comparedPassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  };
  
  
  signupSchema.methods.createJWT = function () {
    return jsonwebtoken.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };
  

const Signup = mongoose.model('Signup', signupSchema);
export default Signup;
