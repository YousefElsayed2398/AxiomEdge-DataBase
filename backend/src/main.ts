import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for Angular frontend
    app.enableCors({
        origin: ['http://localhost:4200'],
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )


    await app.listen(3000);
    console.log('NestJS Backend is running on: http://localhost:3000');
}
bootstrap();
