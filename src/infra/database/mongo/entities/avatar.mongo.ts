import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AvatarDocument = HydratedDocument<AvatarMongo>;

@Schema()
export class AvatarMongo {
  @Prop()
  userId: string;

  @Prop()
  hash: string;
}

export const AvatarSchema = SchemaFactory.createForClass(AvatarMongo);
