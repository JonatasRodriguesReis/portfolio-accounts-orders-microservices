import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderService } from 'src/@core/domain/services/order.service';
import { OrderRepository } from 'src/@core/domain/repositories/order.repository';
import { OrderMemoryRepository } from 'src/@core/infra/db/memory/order-memory.repository';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AccountStorageService } from 'src/@core/domain/services/account-storage.service';
import { EventStreamKafkaRepository } from 'src/@core/infra/event-stream/kafka/event-stream-kafka.repository';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { OrderSchema } from 'src/@core/infra/db/typeorm/order-schema';
import { OrderTypeOrmRepository } from 'src/@core/infra/db/typeorm/order-typeorm.repository';
import { DataSource } from 'typeorm';
import { AccountSchema } from 'src/@core/infra/db/typeorm/account-schema';

@Module({
  imports: [
    AccountsModule,
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: () => ({
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
                    mechanism: 'plain',
                    username: process.env.KAFKA_SASL_USERNAME,
                    password: process.env.KAFKA_SASL_PASSWORD,
                  },
                }),
            },
          },
          consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
          },
        }),
      },
    ]),
    TypeOrmModule.forFeature([OrderSchema, AccountSchema]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: OrderMemoryRepository,
      useFactory: () => {
        return new OrderMemoryRepository();
      },
    },
    {
      provide: OrderTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new OrderTypeOrmRepository(
          dataSource.getRepository(OrderSchema),
          dataSource.getRepository(AccountSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: EventStreamKafkaRepository,
      useFactory: async (kafkaService: ClientKafka) => {
        const kafkaProducer = await kafkaService.connect();
        return new EventStreamKafkaRepository(kafkaProducer);
      },
      inject: ['KAFKA_SERVICE'],
    },
    {
      provide: OrderService,
      useFactory: (
        orderRepository: OrderRepository,
        accountStorageService: AccountStorageService,
        eventStreamKafkaRepository: EventStreamKafkaRepository,
      ) => {
        return new OrderService(
          orderRepository,
          accountStorageService,
          eventStreamKafkaRepository,
        );
      },
      inject: [
        OrderTypeOrmRepository,
        AccountStorageService,
        EventStreamKafkaRepository,
      ],
    },
  ],
})
export class OrdersModule {}
