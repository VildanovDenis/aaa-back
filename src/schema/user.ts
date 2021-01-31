import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  isConfirmed: boolean;
  surname: string;
  avatar: string;
  confirmHash: string;
  lastSeen: Date;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: 'Email is required',
      validate: [validator.isEmail, 'Email is invalid'],
      index: { unique: true },
    },
    name: {
      type: String,
      required: 'Name is required',
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    surname: String,
    avatar: String,
    confirmHash: String,
    lastSeen: Date,
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model<IUser>('User', userSchema);
