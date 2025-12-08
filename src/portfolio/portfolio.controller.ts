import { Controller, Get, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Company } from '../database/schemas/company.schema';
import { PaginationParams } from 'src/common/interfaces/pagination-params.interface';
import { SortParams } from 'src/common/interfaces/sort-params.interface';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @Get()
  async get(
    @Query('name') name?: string,
    @Query('industry') industry?: string,
    @Query('order_by') sortBy?: string,
    @Query('sort_direction') orderBy?: 'ASC' | 'DESC',
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<{ companies: Company[]; count: number }> {
    const pagination: PaginationParams | undefined =
      offset && limit
        ? { offset: Number(offset), limit: Number(limit) }
        : undefined;

    const sort: SortParams | undefined =
      sortBy && orderBy ? { field: sortBy, order: orderBy } : undefined;

    return this.service.getPortfolio(name, industry, pagination, sort);
  }
}
