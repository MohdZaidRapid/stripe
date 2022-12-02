import * as mongoose from 'mongoose';
import { User } from './user.interface';

export const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    cusId: String,
    address: {
      line1: { type: String },
      postal_code: String,
      city: String,
      state: String,
      country: String,
    },
  },
  { timestamps: true },
);
