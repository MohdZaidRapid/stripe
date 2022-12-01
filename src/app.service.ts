import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { ChargeUserDto } from './chargeUser.Dto';
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
    this.createToken();
  }

  async createCustomer({ name, email }: UserDto) {
    const customer = await this.stripe.customers.create({
      name,
      email,
      description: 'from local',
    });

    if (!customer) {
      return 'no customer created ';
    }
    console.log(customer);

    const customerRes = {
      cusId: customer.id,
      name: customer.name,
      email: customer.email,
    };
    const customerData = await this.userModel.create(customerRes);
    await customerData.save();
  }

  async reteriveCustomer() {
    try {
      const customer = await this.stripe.customers.retrieve(
        'cus_Mu01jREMw8zaGx',
      );
      console.log(customer);
    } catch (error) {
      console.log(error.message);
    }
  }

  async createToken() {
    let params: any = {};
    params.card = {
      number: '4242424242424242',
      exp_month: 2,
      exp_year: 2024,
      cvc: '314',
    };

    const token = await this.stripe.tokens.create(params);

    console.log(token);
  }

  async createPaymentMethod() {
    const paymentMethod = await this.stripe.paymentMethods.create({
      customer: 'cus_MtyqObHn0Svku3',
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2023,
        cvc: '314',
      },
    });
    console.log(paymentMethod);
    return paymentMethod;
  }

  async chargeUser({ amount, customerId, paymnetMethodId }: ChargeUserDto) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymnetMethodId,
      currency: 'usd',
      confirm: true,
      description: 'hello',
    });
  }
}
