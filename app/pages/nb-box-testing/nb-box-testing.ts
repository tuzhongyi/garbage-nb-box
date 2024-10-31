import { LocationTool } from '../../common/tools/location.tool'
import { NBBoxTestingBusiness } from './nb-box-testing.business'
import { NBBoxTestingHtmlController } from './nb-box-testing.html.controller'
import './nb-box-testing.less'
import { NBBoxTestingMessage } from './nb-box-testing.message'
export namespace NBBoxTesting {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }

    private business = new NBBoxTestingBusiness()
    private html = new NBBoxTestingHtmlController()
    private message = new NBBoxTestingMessage()

    private get query() {
      return LocationTool.query.decode(location.search)
    }
    private get imei() {
      if (this.query.imei) {
        return this.query.imei
      }
      throw new Error('imei is not found')
    }

    private load() {
      this.html.load(this.imei)
      this.business
        .signal(this.imei)
        .then((x) => {
          this.html.load(this.imei, x.DateTime)
        })
        .finally(() => {
          setTimeout(() => {
            this.load()
          }, 1 * 1000)
        })
    }

    private regist() {
      this.html.event.on('v12restart', () => {
        this.business.v12
          .restart(this.imei)
          .then((x) => {
            alert(x)
          })
          .catch((y) => {
            alert(y)
          })
      })
      this.html.event.on('v5restart', () => {
        this.business.v5
          .restart(this.imei)
          .then((x) => {
            alert(x)
          })
          .catch((y) => {
            alert(y)
          })
      })
      this.html.event.on('v220start', () => {
        this.business.v220
          .start(this.imei)
          .then((x) => {
            alert(x)
          })
          .catch((y) => {
            alert(y)
          })
      })
      this.html.event.on('v220stop', () => {
        this.business.v220
          .stop(this.imei)
          .then((x) => {
            alert(x)
          })
          .catch((y) => {
            alert(y)
          })
      })
      this.html.event.on('close', () => {
        this.message.close()
      })
    }
  }

  const controller = new Controller()
}
