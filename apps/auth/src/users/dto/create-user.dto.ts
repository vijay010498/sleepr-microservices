import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @Field()
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  @IsNotEmpty({
    each: true,
  })
  @Field(() => [String], {
    nullable: true,
  })
  roles?: string[];
}
