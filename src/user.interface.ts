import { Document } from 'mongoose';
export interface User extends Document {
  name: string;
  email: string;
  cusId: string;
  address: {
    line1: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
  };
}
