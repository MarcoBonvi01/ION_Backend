import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../database/schemas/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Get()
  async get(@Query('id') id: string): Promise<Company> {
    try {
      return this.service.getCompany(id);
    } catch (error) {
      Logger.error('[CompanyController] Error fetching company:', error);

      throw new InternalServerErrorException('Failed to fetch company');
    }
  }
}
