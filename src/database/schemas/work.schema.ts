import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkDocument = HydratedDocument<Work>;

@Schema({ collection: 'works' })
export class Work {
  @Prop()
  executed_at: Date;

  @Prop()
  success: boolean;

  @Prop()
  elements_downloaded: number;

  @Prop()
  elements_added: number;

  @Prop()
  elements_removed: number;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
