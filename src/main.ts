// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   await app.listen(3000);
// }
// bootstrap();
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const corsOptions: CorsOptions = {
//     origin: 'http://localhost:3000/users',  // Replace with the actual URL of your Vue.js frontend
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   };

//   app.enableCors(corsOptions);

//   await app.listen(3000);
// }
// bootstrap();
// main.ts
// main.ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet'; // Import helmet module
// import compression from 'compression';
import * as compression from 'compression';

import rateLimit from 'express-rate-limit';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:8080', // Change this to your Vue.js frontend URL
    credentials: true,
  };
  app.use(compression());
  app.enableCors(corsOptions);

  // Use helmet middleware for security headers
  app.use(helmet());

  // Use compression middleware for gzip compression
  app.use(compression());

  // Use express-rate-limit middleware for rate limiting
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));

  // Other middleware and configuration...

  await app.listen(3000);
}
bootstrap();
