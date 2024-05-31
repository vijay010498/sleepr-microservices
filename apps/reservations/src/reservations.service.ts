import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
  UserDto,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService implements OnModuleInit {
  private paymentsService: PaymentsServiceClient;
  constructor(
    private readonly reservationsRepo: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.paymentsService = this.client.getService<PaymentsServiceClient>(
      PAYMENTS_SERVICE_NAME,
    );
  }
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
      .createCharge({
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        map((res) => {
          return this.reservationsRepo.create({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });
        }),
      );
  }

  async findAll() {
    return this.reservationsRepo.find({});
  }

  async findOne(_id: string) {
    return this.reservationsRepo.findOne({
      _id,
    });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepo.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: updateReservationDto,
      },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepo.findOneAndDelete({
      _id,
    });
  }
}
