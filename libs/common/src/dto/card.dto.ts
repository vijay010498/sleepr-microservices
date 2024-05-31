import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CardMessage } from '@app/common/types';

export class CardDto implements CardMessage {
  /**
   * The card's CVC. It is highly recommended to always include this value.
   */
  @IsString()
  @IsNotEmpty()
  cvc: string;

  /**
   * Two-digit number representing the card's expiration month.
   */
  @IsString()
  expMonth: number;

  /**
   * Four-digit number representing the card's expiration year.
   */
  @IsNumber()
  expYear: number;

  /**
   * The card number, as a string without any separators.
   */
  @IsCreditCard()
  number: string;
}
