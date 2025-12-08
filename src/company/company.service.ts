import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from '../database/schemas/company.schema';
import { Model } from 'mongoose';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private readonly logger: LoggerService,
  ) {}

  async getCompany(id: string): Promise<Company> {
    try {
      const company: Company | null = await this.companyModel
        .findOne({
          _id: id,
          deleted_at: { $eq: null },
        })
        .lean()
        .exec();

      if (!company) {
        throw new NotFoundException(`Company with id ${id} not found`);
      }

      this.logger.log(`Found company with id ${id}`, 'CompanyService');

      return company;
    } catch (error) {
      this.logger.error('Failed to fetch companies', error, 'CompanyService');

      throw error;
    }
  }
}
