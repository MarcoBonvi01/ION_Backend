import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Headquarters } from './hq.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ collection: 'companies', timestamps: true })
export class Company {
  @Prop({ required: true })
  yoi: string; // Year of investment

  @Prop({ required: true })
  name: string;

  @Prop()
  logo: string;

  @Prop({ type: Headquarters })
  hq: Headquarters;
  @Prop()
  description: string;

  @Prop()
  industry: string;

  @Prop()
  assetClass: string;

  @Prop()
  region: string;

  @Prop()
  url: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
