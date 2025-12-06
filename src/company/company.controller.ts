import { Controller, Get, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../database/schemas/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Get()
  async get(@Query('id') id: string): Promise<Company> {
    return this.service.getCompany(id);
  }
}
