import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_HOST],
        ssl: process.env.KAFKA_USE_SSL === 'true',
        ...(process.env.KAFKA_SASL_USERNAME &&
          process.env.KAFKA_SASL_USERNAME !== '' &&
          process.env.KAFKA_SASL_PASSWORD &&
          process.env.KAFKA_SASL_PASSWORD !== '' && {
            sasl: {
              mechanism: 'scram-sha-512',
              username: process.env.KAFKA_SASL_USERNAME,
              password: process.env.KAFKA_SASL_PASSWORD,
            },
          }),
      },
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
