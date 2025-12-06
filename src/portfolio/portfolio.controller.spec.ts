import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

describe('PortfolioController', () => {
  let controller: PortfolioController;

  const mockPortfolioService = {
    getAllCompanies: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [
        {
          provide: PortfolioService,
          useValue: mockPortfolioService,
        },
      ],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
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

      mockPortfolioService.getAllCompanies.mockResolvedValue(result);

      expect(await controller.get()).toBe(result);
      expect(mockPortfolioService.getAllCompanies).toHaveBeenCalledWith(
        undefined,
        undefined,
      );
    });

    it('should filter by name', async () => {
      const result = [{ name: 'Tesla', industry: 'Automotive', yoi: '2020' }];

      mockPortfolioService.getAllCompanies.mockResolvedValue(result);

      expect(await controller.get('Tesla')).toBe(result);
      expect(mockPortfolioService.getAllCompanies).toHaveBeenCalledWith(
        'Tesla',
        undefined,
      );
    });

    it('should filter by industry', async () => {
      const result = [{ name: 'Tesla', industry: 'Automotive', yoi: '2020' }];

      mockPortfolioService.getAllCompanies.mockResolvedValue(result);

      expect(await controller.get(undefined, 'Automotive')).toBe(result);
      expect(mockPortfolioService.getAllCompanies).toHaveBeenCalledWith(
        undefined,
        'Automotive',
      );
    });

    it('should filter by name and industry', async () => {
      const result = [{ name: 'Tesla', industry: 'Automotive', yoi: '2020' }];

      mockPortfolioService.getAllCompanies.mockResolvedValue(result);

      expect(await controller.get('Tesla', 'Automotive')).toBe(result);
      expect(mockPortfolioService.getAllCompanies).toHaveBeenCalledWith(
        'Tesla',
        'Automotive',
      );
    });
  });
});
