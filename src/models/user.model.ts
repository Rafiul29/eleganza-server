import mongoose from "mongoose";
import { userType } from "../types/user.type";
import validator from "validator";
import brcypt from "bcrypt"
import { userModelInterface } from "../interfaces/user.interface";
const userSchema = new mongoose.Schema<userType>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    }
  ]
}, { timestamps: true })


userSchema.statics.register = async function (name, email, password, photoUrl, address, phoneNumber): Promise<userType> {
  if (!name || !email || !password || !photoUrl) {
    throw new Error("Must fill name, email and photoUrl");
  }
  const existingUser = await this.findOne({ email })

  if (existingUser) {
    throw new Error("Email already exist");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must 8+ charm contains uppercase lowercase, number and special char");
  }
  const salt = await brcypt.genSalt(10);
  const hash = brcypt.hash(password, salt);
  const user = await this.create({
    name, email, password: hash, photoUrl, address, phoneNumber
  })
  return user;
}

userSchema.statics.login=async function(email,password):Promise<userType>{
    if(!email || !password){
      throw new Error("Must fill email and password");
    }

    const user=await this.findOne({email});

    if(!user){
      throw new Error("Incorrect email or password");
    }

    const match=await brcypt.compare(password,user.password);
    if(!match){
      throw new Error("Incorrect email or password");
    }

      return user;
}


const UserModel = mongoose.model<userType,userModelInterface>('User', userSchema)


export default UserModel;
