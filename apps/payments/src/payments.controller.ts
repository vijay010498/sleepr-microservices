import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common';

@Controller()
@PaymentsServiceControllerMethods() // this one is enough ts-node automatically add all the necessary metadata
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  async createCharge(data: PaymentsCreateChargeDto) {
    // createCharge should be same as defined in payments.proto
    return this.paymentsService.createCharge(data);
  }
}
