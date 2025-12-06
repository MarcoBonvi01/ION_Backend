import { Test, TestingModule } from '@nestjs/testing';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';

describe('WorkController', () => {
  let controller: WorkController;

  const mockWorkService = {
    getWorks: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkController],
      providers: [
        {
          provide: WorkService,
          useValue: mockWorkService,
        },
      ],
    }).compile();

    controller = module.get<WorkController>(WorkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return all companies when no filters provided', async () => {
      const result = [
        { _id: 'timestamp1', success: true, executed_at: new Date() },
        { _id: 'timestamp2', success: false, executed_at: new Date() },
      ];

      mockWorkService.getWorks.mockResolvedValue(result);

      expect(await controller.get()).toBe(result);
      expect(mockWorkService.getWorks).toHaveBeenCalledWith(
        undefined,
        undefined,
      );
    });
  });
});
