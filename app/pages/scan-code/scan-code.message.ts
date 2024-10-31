import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../../data-core/models/window.model'

export interface ScanCodeMessageResponseEvent {
  close(): void
  result(args: ResultArgs): void
}

export class ScanCodeMessage {
  private client = new EventMessageClient<ScanCodeMessageResponseEvent>([
    'close',
    'result',
  ])

  close() {
    this.client.sender.emit('close')
  }
  result(code: string) {
    let args: ResultArgs = {
      result: true,
      message: code,
    }
    this.client.sender.emit('result', args)
  }
}
