import { UserEntity } from '@domain/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements UserEntity {
  @Prop()
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

export const UserSchema = SchemaFactory.createForClass(User)