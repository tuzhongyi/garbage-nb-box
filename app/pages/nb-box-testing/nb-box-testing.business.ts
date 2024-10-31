import { QueryTestSignalRequest } from '../../data-core/requests/services/nb-box/command/nb-box-command.request'
import { NBBoxRequestService } from '../../data-core/requests/services/nb-box/nb-box.service'

export class NBBoxTestingBusiness {
  private service = new NBBoxRequestService()

  v12 = {
    restart: (imei: string) => {
      return new Promise((resolve, reject) => {
        this.service.command.imei.v12
          .restart(imei)
          .then((x) => {
            if (x.Code === 0) {
              resolve('操作成功')
            } else {
              reject(`错误码：${x.Code}\n${x.Msg}`)
            }
          })
          .catch((e) => {
            if (e.InnerException) {
              reject(`错误码：${e.FaultCode}\n${e.InnerException.Message}`)
            }
          })
      })
    },
  }
  v5 = {
    restart: (imei: string) => {
      return new Promise((resolve, reject) => {
        this.service.command.imei.v5
          .restart(imei)
          .then((x) => {
            if (x.Code === 0) {
              resolve('操作成功')
            } else {
              reject(`错误码：${x.Code}\n${x.Msg}`)
            }
          })
          .catch((e) => {
            if (e.InnerException) {
              reject(`错误码：${e.FaultCode}\n${e.InnerException.Message}`)
            }
          })
      })
    },
  }
  v220 = {
    start: (imei: string) => {
      return new Promise((resolve, reject) => {
        this.service.command.v220
          .start(imei)
          .then((x) => {
            if (x.Code === 0) {
              resolve('操作成功')
            } else {
              reject(`错误码：${x.Code}\n${x.Msg}`)
            }
          })
          .catch((e) => {
            if (e.InnerException) {
              reject(`错误码：${e.FaultCode}\n${e.InnerException.Message}`)
            }
          })
      })
    },
    stop: (imei: string) => {
      return new Promise((resolve, reject) => {
        this.service.command.v220
          .stop(imei)
          .then((x) => {
            if (x.Code === 0) {
              resolve('操作成功')
            } else {
              reject(`错误码：${x.Code}\n${x.Msg}`)
            }
          })
          .catch((e) => {
            if (e.InnerException) {
              reject(`错误码：${e.FaultCode}\n${e.InnerException.Message}`)
            }
          })
      })
    },
  }

  signal(imei: string) {
    let req = new QueryTestSignalRequest()
    req.Imei = imei
    return this.service.command.test.signal.query(req)
  }
}
