import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { ChargeUserDto } from './chargeUser.Dto';
import { CreateSubscriptionProductDto } from './subscription.dto';
import { AddressDto, UserDto } from './user.dto';
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
    // this.addCardToCustomer();
    // this.chargeCustomerThroughCustomerId();
    // this.reteriveCustomer();
    // this.createCustomer({
    //   name: 'MohdzaidRpidInnnovation',
    //   email: 'mohdzaid@rapidinnovation.dev',
    //   address: {
    //     city: 'Delhi',
    //     country: 'India',
    //     line1: '510 Townsend Standford',
    //     postal_code: '98140',
    //     state: 'delhi',
    //   },
    // });
    // this.chargeCustomerthroughTokenID();
    // this.createSubscriptionProduct({
    //   description: 'Best Plan in the whole section',
    //   name: 'Plus Ultra',
    // });
  }

  async createCustomer(userDto: UserDto) {
    const userData = {
      name: userDto.name,
      email: userDto.email,
      address: {
        line1: userDto.address.line1,
        postal_code: userDto.address.postal_code,
        city: userDto.address.city,
        state: userDto.address.state,
        country: userDto.address.country,
      },
    };
    const customer = await this.stripe.customers.create(userData);

    if (!customer) {
      return 'no customer created ';
    }
    console.log(customer);

    const customerRes = {
      cusId: customer.id,
      name: customer.name,
      email: customer.email,
      address: {
        line1: customer.address.line1,
        postal_code: customer.address.postal_code,
        city: customer.address.city,
        state: customer.address.state,
        country: customer.address.country,
      },
    };
    const customerData = await this.userModel.create(customerRes);
    await customerData.save();
  }

  async reteriveCustomer() {
    try {
      const customer = await this.stripe.customers.retrieve(
        'cus_MuIEJ8heFwDeTF',
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
      exp_month: 3,
      exp_year: 2024,
      cvc: '314',
    };

    const token = await this.stripe.tokens.create(params);

    // console.log(token);
  }

  async addCardToCustomer() {
    const AddingcardAndCutomerDetails =
      await this.stripe.customers.createSource('cus_MuIEJ8heFwDeTF', {
        source: 'tok_1MATgzSEemFirGIokpjkI3yr',
      });

    console.log(AddingcardAndCutomerDetails);
  }

  async chargeCustomerThroughCustomerId() {
    let param = {
      amount: 2000,
      currency: 'usd',
      description: 'First payment',
      customer: 'cus_MuIEJ8heFwDeTF',
      payment_method_types: ['card'],
      payment_method: 'card_1MATgySEemFirGIolGJcgz64',
      confirm: true,
    };
    const transaction = await this.stripe.paymentIntents.create(param);
    console.log(transaction);
  }

  async chargeCustomerthroughTokenID() {
    let param = {
      amount: 2000,
      currency: 'usd',
      description: 'First payment',
      source: 'tok_1MATgzSEemFirGIokpjkI3yr',
    };
    const transaction = await this.stripe.paymentIntents.create(param);
    console.log(transaction);
  }

  async createSubscriptionProduct(
    createSubscriptionProductDto: CreateSubscriptionProductDto,
  ) {
    try {
      const { name, description } = createSubscriptionProductDto;
      const params: Stripe.ProductCreateParams = {
        name,
        description,
      };
      const subscriptionProduct = await this.stripe.products.create(params);

      console.log(subscriptionProduct);
    } catch (error) {
      console.log(error);
    }
  }
}
