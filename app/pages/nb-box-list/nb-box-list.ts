import { NBBoxListHtmlController } from './controller/nb-box-list.html.controller'
import { NBBoxListBusiness } from './nb-box-list.business'
import './nb-box-list.less'
import { NBBoxListMessage } from './nb-box-list.message'
import { NBBoxListWindow } from './nb-box-list.window'
export namespace NBBoxList {
  class Controller {
    constructor() {
      this.regist()
    }

    private html = new NBBoxListHtmlController()
    private business = new NBBoxListBusiness()
    private window = new NBBoxListWindow()
    private message = new NBBoxListMessage()

    private regist() {
      this.html.event.on('search', (iemi) => {
        this.load(iemi)
      })
      this.html.event.on('scan', () => {
        this.message.open(this.window.code)
      })
      this.html.event.on('select', (iemi) => {
        this.window.testing.query.imei = iemi
        this.message.open(this.window.testing)
      })
      this.message.event.on('code', (code) => {
        this.html.iemi(code)
      })
    }

    private load(imei?: string) {
      this.html.clear()
      this.business.load(imei).then((x) => {
        this.html.load(x)
      })
    }
  }

  const controller = new Controller()
}
