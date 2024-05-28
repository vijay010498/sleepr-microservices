import { Injectable, Logger } from '@nestjs/common';
import { AbstractRespository } from '@app/common/database/abstract.respository';
import { Reservation } from './models/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ReservationsRepository extends AbstractRespository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name);
  constructor(
    @InjectRepository(Reservation)
    reservationRepository: Repository<Reservation>,
    entityManager: EntityManager,
  ) {
    super(reservationRepository, entityManager);
  }
}
