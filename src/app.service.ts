import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { UserDto } from './user.dto';
import { User } from './user.interface';

@Injectable()
export class AppService {
  private stripe: Stripe;
  constructor(
    private configService: ConfigService,
    @InjectModel('User') private userModel: Model<User>,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
      typescript: true,
    });
    // console.log(this.stripe);
    // this.createUser({ name: 'zaid', email: 'zaid@gmail.com' });
  }

  async createUser({ name, email }: UserDto) {
    const customer = await this.stripe.customers.create({
      name,
      email,
    });
    const customerRes = {
      cusId: customer.id,
      name: customer.name,
      email: customer.email,
    };
    const customerData = await this.userModel.create(customerRes);
    await customerData.save();
  }

  async chargeUser(){
    
  }
}
