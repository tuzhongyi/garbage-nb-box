import { EventMessageClient } from '../../common/event-message/event-message.client'

interface NBBoxTestingMessageResponseEvent {
  close(): void
}

export class NBBoxTestingMessage {
  private client = new EventMessageClient<NBBoxTestingMessageResponseEvent>([
    'close',
  ])

  close() {
    this.client.send({
      command: 'close',
      index: 0,
    })
  }
}
