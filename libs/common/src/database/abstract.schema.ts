import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema()
@ObjectType({
  isAbstract: true, // wont be registered in schema but just inherited in other types like in reservation document
})
export class AbstractDocument {
  @Prop({
    type: SchemaTypes.ObjectId,
  })
  @Field(() => String) // type
  _id: Types.ObjectId;
}
