import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule, UsersDocument, UsersEntity } from '@app/common';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UsersDocument.name,
        schema: UsersEntity,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
