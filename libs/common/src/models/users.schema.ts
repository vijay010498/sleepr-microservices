import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({
  versionKey: false,
})
@ObjectType()
export class UsersDocument extends AbstractDocument {
  @Prop({
    unique: true,
  })
  @Field()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @Field(() => [String])
  roles?: string[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);
