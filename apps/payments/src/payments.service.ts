import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
@Injectable()
export class PaymentsService implements OnModuleInit {
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-04-10',
    },
  );

  private notificationsService: NotificationsServiceClient;
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    // can also be done in runtime like (!this.notificationsService) {this.notificationsService= ....}
    this.notificationsService =
      this.client.getService<NotificationsServiceClient>(
        NOTIFICATIONS_SERVICE_NAME,
      );
  }

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      //payment_method: paymentMethod.id,
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      currency: 'cad',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      //payment_method_types: ['card'],
    });
    this.notificationsService
      .notifyEmail({
        email,
        text: `Payment of $${amount} completed successfully`,
      })
      .subscribe(() => {}); // to get actually executed
    return paymentIntent;
  }
}
