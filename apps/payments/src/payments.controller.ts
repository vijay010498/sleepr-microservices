import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  async createCharge(@Payload() data: PaymentsCreateChargeDto) {
    throw new Error();
    return this.paymentsService.createCharge(data);
  }
}
