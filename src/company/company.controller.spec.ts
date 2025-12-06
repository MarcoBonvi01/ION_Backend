import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let controller: CompanyController;

  const mockCompanyService = {
    get: jest.fn(),
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

      mockCompanyService.get = jest.fn().mockResolvedValue(result);

      expect(await controller.get(id)).toBe(result);
      expect(mockCompanyService.get).toHaveBeenCalledWith(id);
    });
  });
});
