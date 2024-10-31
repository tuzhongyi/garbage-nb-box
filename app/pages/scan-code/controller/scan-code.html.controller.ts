import { ScanCodeVideoController } from './scan-code-video.controller'

import { EventEmitter } from '../../../common/event-emitter'
import '../scan-code.less'
import { ScanCodeBarController } from './scan-code-bar.controller'
import { ScanCodeQRController } from './scan-code-qr.controller'

interface ScanCodeHtmlControllerEvent {
  ok(code: string): void
  cancel(): void
}

export class ScanCodeHtmlController {
  event = new EventEmitter<ScanCodeHtmlControllerEvent>()

  constructor() {
    this.init()
    this.regist()
  }

  private video = new ScanCodeVideoController()
  private qr = new ScanCodeQRController()
  private bar = new ScanCodeBarController()

  private element = {
    code: document.getElementById('code') as HTMLInputElement,
    ok: document.getElementById('ok') as HTMLButtonElement,
    cancel: document.getElementById('cancel') as HTMLButtonElement,
  }

  private init() {}

  private regist() {
    window.addEventListener('load', () => {
      try {
        setTimeout(() => {
          this.video.play()
          // this.video.test()
        }, 1000)
      } catch (error: any) {
        alert(error.message)
      }
    })
    this.video.event.on('data', (data) => {
      try {
        let code = this.qr.code(data)
        if (code) {
          let codes = code.split(',')
          if (codes.length > 1) {
            this.element.code.value = codes[0]
          } else {
            this.element.code.value = code
          }
          this.video.stop()
        }
      } catch (error: any) {
        alert(error.message)
      }
    })
    this.video.event.on('url', (url) => {
      this.bar.data(url).then((code) => {
        if (code) {
          this.element.code.value = code
          this.video.stop()
        }
      })
    })
    this.element.ok.addEventListener('click', () => {
      if (this.element.code.value) {
        this.event.emit('ok', this.element.code.value)
      }
    })
    this.element.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }
}
