import { NBBoxActiveVideoController } from './nb-box-active-video.controller'

import { EventEmitter } from '../../../common/event-emitter'
import '../nb-box-active.less'
import { NBBoxActiveQRController } from './nb-box-active-qr.controller'

interface NBBoxActiveHtmlControllerEvent {
  active(code: string): void
}

export class NBBoxActiveHtmlController {
  event = new EventEmitter<NBBoxActiveHtmlControllerEvent>()

  constructor() {
    this.init()
    this.regist()
  }

  private video = new NBBoxActiveVideoController()
  private qr = new NBBoxActiveQRController()

  private element = {
    code: document.getElementById('code') as HTMLInputElement,
    log: document.getElementById('log') as HTMLDivElement,
    error: document.getElementById('error') as HTMLDivElement,
    active: document.getElementById('active') as HTMLButtonElement,
  }

  private init() {}

  private regist() {
    window.addEventListener('load', () => {
      try {
        setTimeout(() => {
          this.video.play()
        }, 1000)
      } catch (error: any) {
        alert(error.message)
      }
    })
    this.video.event.on('tick', (data) => {
      try {
        let code = this.qr.tick(data)
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
    this.element.active.addEventListener('click', () => {
      this.element.error.innerText = ''
      this.element.log.innerText = ''
      if (this.element.code.value === '') {
        alert('请输入IMEI')
        return
      }
      this.event.emit('active', this.element.code.value)
    })
  }

  log(message: string) {
    this.element.log.innerText = message
  }
  error(message: string) {
    this.element.error.innerText = message
  }
}
