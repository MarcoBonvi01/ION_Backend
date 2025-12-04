import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let controller: CompanyController;

  const mockCompanyService = {
    getAllCompanies: jest.fn(),
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

  describe('getAll', () => {
    it('should return all companies when no filters provided', async () => {
      const result = [
        { name: 'Tesla', industry: 'Automotive', yoi: '2020' },
        { name: 'Apple', industry: 'Technology', yoi: '2021' },
      ];

      mockCompanyService.getAllCompanies.mockResolvedValue(result);

      expect(await controller.getAll()).toBe(result);
      expect(mockCompanyService.getAllCompanies).toHaveBeenCalledWith(
        undefined,
        undefined,
      );
    });

    it('should filter by name', async () => {
      const result = [{ name: 'Tesla', industry: 'Automotive', yoi: '2020' }];

      mockCompanyService.getAllCompanies.mockResolvedValue(result);

      expect(await controller.getAll('Tesla')).toBe(result);
      expect(mockCompanyService.getAllCompanies).toHaveBeenCalledWith(
        'Tesla',
        undefined,
      );
    });

    it('should filter by industry', async () => {
      const result = [{ name: 'Tesla', industry: 'Automotive', yoi: '2020' }];

      mockCompanyService.getAllCompanies.mockResolvedValue(result);

      expect(await controller.getAll(undefined, 'Automotive')).toBe(result);
      expect(mockCompanyService.getAllCompanies).toHaveBeenCalledWith(
        undefined,
        'Automotive',
      );
    });

    it('should filter by name and industry', async () => {
      const result = [{ name: 'Tesla', industry: 'Automotive', yoi: '2020' }];

      mockCompanyService.getAllCompanies.mockResolvedValue(result);

      expect(await controller.getAll('Tesla', 'Automotive')).toBe(result);
      expect(mockCompanyService.getAllCompanies).toHaveBeenCalledWith(
        'Tesla',
        'Automotive',
      );
    });
  });
});
