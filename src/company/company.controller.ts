import { Controller, Get, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../database/schemas/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Get()
  async getAll(
    @Query('name') name?: string,
    @Query('industry') industry?: string,
  ): Promise<Company[]> {
    return this.service.getAllCompanies(name, industry);
  }
}
