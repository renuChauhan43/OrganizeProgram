import Signup from '../models/signUpModel.js';


 export const registerController = async (req, res) => {
  const { firstname, lastname, email, phonenumber, type, password } = req.body;


  if (!firstname || !lastname|| !email|| !phonenumber|| !type|| !password ) {
    return res.status(404).send({
      success: false,
      message: "Please enter all fields",
    });
  }
    const existingUser = await Signup.findOne({ email :email});
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "email already registered",
      });    }

    const newUser = await Signup.create({
      firstname :firstname,
      lastname :lastname,
      email :email,
      phonenumber :phonenumber,
      type :type,
      password: password 
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successfull' ,newUser :{
      firstname :firstname,
      lastname :lastname,
      email :email,
      phonenumber :phonenumber,
      type :type,
    }  });
 
};

export const loginController = async (req, res ,next)  =>{
 
 
const {email, password} = req.body
if (!email || !password) {
  next('All fields are required')}

  
    const  user  = await Signup.findOne({email})
    if (!user) {
      next("Invalid username or password");
    }

    const isMatch = await user.comparedPassword(password);
    if (!isMatch) {
      next('Invalid username or password')
    }
    user.password = undefined;

    const token = user.createJWT();

     res.status(200).json({
      success: true,
      message: 'Login successful',
      user: user,
      token: token
    });
  }




