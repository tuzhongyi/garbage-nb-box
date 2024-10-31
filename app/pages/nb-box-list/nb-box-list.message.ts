import { EventEmitter } from '../../common/event-emitter'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { LocationTool } from '../../common/tools/location.tool'
import { ResultArgs, WindowModel } from '../../data-core/models/window.model'

interface NBBoxListMessageResponseEvent {
  close(): void
  result(args: ResultArgs): void
}
interface NBBoxListMessageEvent {
  code(code: string): void
}

export class NBBoxListMessage {
  event = new EventEmitter<NBBoxListMessageEvent>()

  constructor() {
    this.regist()
  }

  private element = document.querySelector('#window') as HTMLDivElement
  private mask = document.querySelector('#window_mask') as HTMLDivElement
  private iframe = this.element.querySelector('iframe') as HTMLIFrameElement
  private opened = false
  private message = new EventMessageProxy<NBBoxListMessageResponseEvent>(
    this.iframe
  )

  private regist() {
    this.message.event.on('close', () => {
      this.close()
    })
    this.message.event.on('result', (args) => {
      if (args.result) {
        this.event.emit('code', args.message)
        this.close()
      }
    })
    this.iframe.addEventListener('load', () => {
      if (this.opened) {
        this.mask.style.display = ''
      }
    })
  }
  private close() {
    this.opened = false
    this.mask.style.display = 'none'
    this.iframe.src = 'about:blank'
    this.iframe.contentWindow?.document.write('')
  }

  open(args: WindowModel) {
    this.opened = true
    if (args.query) {
      this.iframe.src = LocationTool.query.encode(args.url, args.query)
    } else {
      this.iframe.src = args.url
    }
    if (args.style) {
      if (args.style.width) {
        this.element.style.width = args.style.width
      }
      if (args.style.height) {
        this.element.style.height = args.style.height
      }
      if (args.style.aspectRatio) {
        this.element.style.aspectRatio = args.style.aspectRatio
      }
    }
  }
}
