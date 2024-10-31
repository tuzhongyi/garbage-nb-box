import { ScanCodeHtmlController } from './controller/scan-code.html.controller'
import { ScanCodeMessage } from './scan-code.message'

export namespace ScanCode {
  class Controller {
    constructor() {
      this.regist()
    }

    private html = new ScanCodeHtmlController()
    private message = new ScanCodeMessage()

    private async regist() {
      this.html.event.on('ok', (code) => {
        this.message.result(code)
      })
      this.html.event.on('cancel', () => {
        this.message.close()
      })
    }
  }

  const controller = new Controller()
}
