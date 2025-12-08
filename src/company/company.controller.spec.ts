import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { NotFoundException } from '@nestjs/common';

describe('CompanyController', () => {
  let controller: CompanyController;

  const mockCompanyService = {
    getCompany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOne', () => {
    it('should return a company by id', async () => {
      const id = '123';
      const result = { id: '123', name: 'Tesla', industry: 'Automotive' };

      mockCompanyService.getCompany = jest.fn().mockResolvedValue(result);

      expect(await controller.get(id)).toBe(result);
      expect(mockCompanyService.getCompany).toHaveBeenCalledWith(id);
    });
  });

  describe('getOneDeleted', () => {
    it('should throw NotFoundException if the company is deleted', async () => {
      const id = '123';

      mockCompanyService.getCompany = jest.fn().mockImplementation(() => {
        throw new NotFoundException(`Company with id ${id} not found`);
      });

      await expect(controller.get(id)).rejects.toThrow(NotFoundException);
      expect(mockCompanyService.getCompany).toHaveBeenCalledWith(id);
    });
  });
});
