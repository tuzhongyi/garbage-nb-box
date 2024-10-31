import { BaseUrl } from '../../base.url'

export class NBBoxCommandUrl {
  private static basic = `${BaseUrl.api}/Commd`

  static ctwing = {
    request: () => {
      return `${this.basic}/CtwingRequest`
    },
  }
  static device = {
    status: {
      history: (imei: string, begin: string, end: string) => {
        return `${this.basic}/GetDeviceStatusHis?Imei=${imei}&BeginTime=${begin}&EndTime=${end}`
      },
    },
    create: (imei: string) => {
      return `${this.basic}/CreateDevice?Imei=${imei}`
    },
  }
  static imei = {
    v12: {
      restart: (imei: string) => {
        return `${this.basic}/Restar12VByIMEI?Imei=${imei}`
      },
    },
    v5: {
      restart: (imei: string) => {
        return `${this.basic}/Restar5VByIMEI?Imei=${imei}`
      },
    },
  }
  static v220 = {
    start: (imei: string) => {
      return `${this.basic}/Start220v?Imei=${imei}`
    },
    stop: (imei: string) => {
      return `${this.basic}/Stop220v?Imei=${imei}`
    },
  }

  static create() {
    return `${this.basic}/CreateNbPowerNoxs`
  }
  static delete(imei: string) {
    return `${this.basic}/DeleteNbPowerNoxs?Imei=${imei}`
  }

  static test() {
    return `${this.basic}/QueryTestSignal`
  }
}
