import { Injectable, Logger } from '@nestjs/common';
import { AbstractRespository } from '@app/common/database/abstract.respository';
import { ReservationDocument } from './models/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRespository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);
  constructor(
    @InjectModel(ReservationDocument.name)
    protected reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
