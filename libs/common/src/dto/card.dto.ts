import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CardDto {
  /**
   * The card's CVC. It is highly recommended to always include this value.
   */
  @IsString()
  @IsNotEmpty()
  @Field()
  cvc: string;

  /**
   * Two-digit number representing the card's expiration month.
   */
  @IsNumber()
  @Field()
  exp_month: number;

  /**
   * Four-digit number representing the card's expiration year.
   */
  @IsNumber()
  @Field()
  exp_year: number;

  /**
   * The card number, as a string without any separators.
   */
  @IsCreditCard()
  @Field()
  number: string;
}
