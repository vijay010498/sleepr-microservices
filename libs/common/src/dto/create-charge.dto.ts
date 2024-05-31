import { CardDto } from '@app/common/dto/card.dto';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChargeMessage } from '@app/common/types';

export class CreateChargeDto implements Omit<CreateChargeMessage, 'email'> {
  // omit except email property
  // CreateChargeMessage use prototypes but still validate using class-validator and transformer
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}
