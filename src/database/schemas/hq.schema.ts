import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Headquarters {
  @Prop()
  city: string;

  @Prop()
  state?: string;

  @Prop()
  country: string;
}
