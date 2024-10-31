import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'

interface NBBoxTestingHtmlControllerEvent {
  v12restart(): void
  v5restart(): void
  v220start(): void
  v220stop(): void
  signaltest(): void
  close(): void
}
export class NBBoxTestingHtmlController {
  event = new EventEmitter<NBBoxTestingHtmlControllerEvent>()
  constructor() {
    this.regist()
  }

  private element = {
    v12: {
      restart: document.getElementById('v12-restart') as HTMLButtonElement,
    },
    v5: {
      restart: document.getElementById('v5-restart') as HTMLButtonElement,
    },
    v220: {
      start: document.getElementById('v220-start') as HTMLButtonElement,
      stop: document.getElementById('v220-stop') as HTMLButtonElement,
    },
    signal: {
      time: document.getElementById('signal-time') as HTMLDivElement,
    },
    title: document.getElementById('title') as HTMLDivElement,
    close: document.getElementById('close') as HTMLDivElement,
  }

  private regist() {
    this.element.v12.restart.addEventListener('click', () => {
      this.event.emit('v12restart')
    })
    this.element.v5.restart.addEventListener('click', () => {
      this.event.emit('v5restart')
    })
    this.element.v220.start.addEventListener('click', () => {
      this.event.emit('v220start')
    })
    this.element.v220.stop.addEventListener('click', () => {
      this.event.emit('v220stop')
    })
    this.element.close.addEventListener('click', () => {
      this.event.emit('close')
    })
  }

  load(imei: string, signal?: Date) {
    this.element.title.innerText = HtmlTool.set(imei)
    if (signal) {
      this.element.signal.time.innerText = signal.format('yyyy-MM-dd HH:mm:ss')
    }
  }
}
