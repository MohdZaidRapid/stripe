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
  },
  { timestamps: true },
);
