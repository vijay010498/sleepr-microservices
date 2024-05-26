import { Injectable, Logger } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  async notifyEmail({ email }: NotifyEmailDto) {
    this.logger.verbose('Email notification request' + email);
  }
}
