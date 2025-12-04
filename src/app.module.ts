import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make config module global
      envFilePath: '.env', // path to env file
    }), // module for config
    DatabaseModule, // module for database
    LoggerModule, // module for logger
    CompanyModule, // module for company
  ],
})
export class AppModule {}
