import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Query,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { PaginationParams } from 'src/common/interfaces/pagination-params.interface';
import { SortParams } from 'src/common/interfaces/sort-params.interface';
import { Work } from 'src/database/schemas/work.schema';

@Controller('works')
export class WorkController {
  constructor(private readonly service: WorkService) {}

  @Get()
  async get(
    @Query('sort') sortBy?: string,
    @Query('order') orderBy?: 'ASC' | 'DESC',
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<{ works: Work[]; count: number }> {
    const pagination: PaginationParams | undefined =
      offset && limit
        ? { offset: Number(offset), limit: Number(limit) }
        : undefined;

    const sort: SortParams | undefined =
      sortBy && orderBy ? { field: sortBy, order: orderBy } : undefined;

    try {
      return this.service.getWorks(pagination, sort);
    } catch (error) {
      Logger.error('[WorkController] Error fetching works:', error);

      throw new InternalServerErrorException('Failed to fetch works');
    }
  }
}
