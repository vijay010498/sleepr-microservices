import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENT_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Reservation } from './models/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepo: ReservationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    // this.paymentsService
    //   .send('create_charge', createReservationDto.charge)
    //   .subscribe(async (response) => {
    //     console.log(response);
    //     const reservations = await this.reservationsRepo.create({
    //       ...createReservationDto,
    //       timestamp: new Date(),
    //       userId,
    //     });
    //   });

    // above and down both equal

    return this.paymentsService
      .send('create_charge', {
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        map((res) => {
          const reservation = new Reservation({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });
          return this.reservationsRepo.create(reservation);
        }),
      );
  }

  async findAll() {
    return this.reservationsRepo.find({});
  }

  async findOne(id: number) {
    return this.reservationsRepo.findOne({
      id,
    });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepo.findOneAndUpdate(
      {
        id,
      },
      updateReservationDto,
    );
  }

  async remove(id: number) {
    return this.reservationsRepo.findOneAndDelete({
      id,
    });
  }
}
