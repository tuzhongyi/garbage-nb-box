import { BaseUrl } from '../../base.url'

export class NBPowerBoxUrl {
  private static basic = `${BaseUrl.api}/NBPowerBox`

  static all(page: number, rows: number, imei?: string) {
    let url = `${this.basic}/GetAllPowerBox?Page=${page}&Rows=${rows}`
    if (imei) {
      url += `&Imei=${imei}`
    }
    return url
  }

  static restarted(seconds: number) {
    return `${this.basic}/GetRestartPowerBoxes?Seconds=${seconds}`
  }
}
