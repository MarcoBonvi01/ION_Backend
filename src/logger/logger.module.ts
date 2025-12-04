import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global() // make logger service available globally
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
