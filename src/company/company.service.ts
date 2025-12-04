import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from 'src/database/schemas/company.schema';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private readonly logger: LoggerService,
  ) {}

  async getAllCompanies(
    name: string | undefined,
    industry: string | undefined,
  ): Promise<Company[]> {
    try {
      const companies = await this.companyModel
        .find({
          ...(name ? { name: { $regex: name, $options: 'i' } } : {}),
          ...(industry
            ? { industry: { $regex: industry, $options: 'i' } }
            : {}),
        })
        .lean() // use of lean() for to return a plain javascript object instead of a mongoose document
        .exec();

      this.logger.log(`Found ${companies.length} companies`, 'CompanyService');

      return companies;
    } catch (error) {
      this.logger.error('Failed to fetch companies', error, 'CompanyService');

      throw error;
    }
  }
}
