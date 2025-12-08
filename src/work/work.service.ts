import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggerService } from '../logger/logger.service';
import { PaginationParams } from '../common/interfaces/pagination-params.interface';
import { SortParams } from '../common/interfaces/sort-params.interface';
import { Work, WorkDocument } from '../database/schemas/work.schema';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name) private workModel: Model<WorkDocument>,
    private readonly logger: LoggerService,
  ) {}

  async getWorks(
    pagination: PaginationParams | undefined,
    sort: SortParams | undefined,
  ): Promise<{ works: Work[]; count: number }> {
    try {
      const query = this.workModel.find();

      if (sort) {
        query.sort({ [sort.field]: sort.order === 'ASC' ? 1 : -1 });
      }

      if (pagination) {
        query.skip(pagination.offset).limit(pagination.limit);
      }

      const works = await query.lean().exec();

      const count = await this.workModel.countDocuments();

      this.logger.log(`Found ${works.length} works`, 'WorkService');

      return { works, count };
    } catch (error) {
      this.logger.error('Failed to fetch work', error, 'WorkService');

      throw error;
    }
  }
}
