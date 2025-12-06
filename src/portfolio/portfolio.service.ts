import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from 'src/database/schemas/company.schema';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';
import { PaginationParams } from 'src/common/interfaces/pagination-params.interface';
import { SortParams } from 'src/common/interfaces/sort-params.interface';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Company.name) private portfolioModel: Model<CompanyDocument>,
    private readonly logger: LoggerService,
  ) {}

  async getPortfolio(
    name: string | undefined,
    industry: string | undefined,
    pagination: PaginationParams | undefined,
    sort: SortParams | undefined,
  ): Promise<{ companies: Company[]; count: number }> {
    try {
      const query = this.portfolioModel.find({
        ...(name ? { name: { $regex: name, $options: 'i' } } : {}),
        ...(industry ? { industry: { $regex: industry, $options: 'i' } } : {}),
      });

      if (sort) {
        query.sort({ [sort.field]: sort.order === 'ASC' ? 1 : -1 });
      }

      if (pagination) {
        query.skip(pagination.offset).limit(pagination.limit);
      }

      const companies = await query.lean().exec();

      const count = await this.portfolioModel.countDocuments({
        ...(name ? { name: { $regex: name, $options: 'i' } } : {}),
        ...(industry ? { industry: { $regex: industry, $options: 'i' } } : {}),
      });

      this.logger.log(
        `Found ${companies.length} companies`,
        'PortfolioService',
      );

      return { companies, count };
    } catch (error) {
      this.logger.error('Failed to fetch portfolio', error, 'PortfolioService');

      throw error;
    }
  }
}
