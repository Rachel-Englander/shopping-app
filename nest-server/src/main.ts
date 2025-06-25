import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // מאפשר לכל הדומיינים גישה
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // אם אתה רוצה לאפשר עוגיות בין דומיינים
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
