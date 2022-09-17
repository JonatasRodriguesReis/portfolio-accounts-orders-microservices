import { PublishMessageDTO } from 'src/@core/domain/dtos/event-stream.dtos';
import { EventStreamRepository } from 'src/@core/domain/repositories/event-stream.repository';

export class EventStreamMemoryRepository implements EventStreamRepository {
  private eventsData: PublishMessageDTO[];

  constructor() {
    this.eventsData = [];
  }

  async publish(eventData: PublishMessageDTO): Promise<void> {
    this.eventsData.push(eventData);
  }
}
