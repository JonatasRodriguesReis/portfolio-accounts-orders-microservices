import { PublishMessageDTO } from 'src/@core/domain/dtos/event-stream.dtos';
import { EventStreamRepository } from '../../../domain/repositories/event-stream.repository';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

export class EventStreamKafkaRepository implements EventStreamRepository {
  constructor(private kafkaProducer: Producer) {}

  async publish(eventData: PublishMessageDTO): Promise<void> {
    await this.kafkaProducer.send(eventData);
  }
}
