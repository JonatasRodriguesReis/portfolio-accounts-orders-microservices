import { PublishMessageDTO } from '../dtos/event-stream.dtos';

export interface EventStreamRepository {
  publish(eventData: PublishMessageDTO): Promise<void>;
}
