import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: !process.env.FRONTEND_PORT
      ? process.env.FRONTEND_URL
      : process.env.FRONTEND_URL + ':' + process.env.FRONTEND_PORT,
    credentials: true,
  });

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(PORT);
}

bootstrap();
