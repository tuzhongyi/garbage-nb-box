import { NBBoxActiveHtmlController } from './controller/nb-box-active.html.controller'
import { NBBoxActiveBusiness } from './nb-box-active.business'

export namespace NBBoxActive {
  class Controller {
    constructor() {
      this.regist()
    }

    business = new NBBoxActiveBusiness()
    private html = new NBBoxActiveHtmlController()

    private async regist() {
      this.html.event.on('active', this.onactive.bind(this))
    }

    onactive(imei: string) {
      this.business
        .active(imei)
        .then((x) => {
          this.html.log('激活成功')
        })
        .catch((error) => {
          this.html.error(error.message)
        })
    }
  }

  const controller = new Controller()
}
