import { UserEntity } from '@domain/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserMongo>;

@Schema()
export class UserMongo implements UserEntity {
  @Prop({
    name: '_id',
    schemaName: '_id',
    index: true,
    required: true,
    unique: true,
    type: String,
  })
  id: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(UserMongo);
