import { Injectable, Logger } from '@nestjs/common';
import { AbstractRespository } from '@app/common';
import { UsersDocument } from './models/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRespository<UsersDocument> {
  protected readonly logger: Logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UsersDocument.name) usersModel: Model<UsersDocument>,
  ) {
    super(usersModel);
  }
}
