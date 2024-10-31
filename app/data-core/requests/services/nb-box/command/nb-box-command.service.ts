import axios from 'axios'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { DeviceState } from '../../../../models/nb-box/device-state.model'
import { NBBoxUrl } from '../../../../urls/nb-box/nb-box.url'
import {
  GetDeviceStatusHistoryRequest,
  QueryTestSignalRequest,
} from './nb-box-command.request'
import {
  AEPResponseEntity,
  QueryTestSignalResponse,
} from './nb-box-command.response'

export class NBBoxCommandRequestService {
  constructor() {}

  // ctwing(page: number, rows: number, imei?: string) {
  //   let url = NBBoxUrl.power.all(page, rows, imei)
  //   axios.post(url).then
  // }

  device = {
    status: {
      history: async (req: GetDeviceStatusHistoryRequest) => {
        let plain = instanceToPlain(req)
        let url = NBBoxUrl.command.device.status.history(
          plain.Imei,
          plain.BeginTime,
          plain.EndTime
        )
        let response = await axios.get<DeviceState[]>(url)
        return plainToInstance(DeviceState, response.data) as DeviceState[]
      },
    },
    create: async (imei: string) => {
      let url = NBBoxUrl.command.device.create(imei)
      let response = await axios.get<AEPResponseEntity>(url)
      return plainToInstance(AEPResponseEntity, response.data)
    },
  }

  imei = {
    v12: {
      restart: (imei: string) => {
        return new Promise<AEPResponseEntity>((resolve, reject) => {
          let url = NBBoxUrl.command.imei.v12.restart(imei)
          axios
            .get<AEPResponseEntity>(url)
            .then((response) => {
              let result = plainToInstance(AEPResponseEntity, response.data)
              resolve(result)
            })
            .catch((e) => {
              reject(e.response.data)
            })
        })
      },
    },
    v5: {
      restart: async (imei: string) => {
        return new Promise<AEPResponseEntity>((resolve, reject) => {
          let url = NBBoxUrl.command.imei.v5.restart(imei)
          axios
            .get<AEPResponseEntity>(url)
            .then((response) => {
              let result = plainToInstance(AEPResponseEntity, response.data)
              resolve(result)
            })
            .catch((e) => {
              reject(e.response.data)
            })
        })
      },
    },
  }
  v220 = {
    start: async (imei: string) => {
      return new Promise<AEPResponseEntity>((resolve, reject) => {
        let url = NBBoxUrl.command.v220.start(imei)
        axios
          .get<AEPResponseEntity>(url)
          .then((response) => {
            let result = plainToInstance(AEPResponseEntity, response.data)
            resolve(result)
          })
          .catch((e) => {
            reject(e.response.data)
          })
      })
    },
    stop: async (imei: string) => {
      return new Promise<AEPResponseEntity>((resolve, reject) => {
        let url = NBBoxUrl.command.v220.stop(imei)
        axios
          .get<AEPResponseEntity>(url)
          .then((response) => {
            let result = plainToInstance(AEPResponseEntity, response.data)
            resolve(result)
          })
          .catch((e) => {
            reject(e.response.data)
          })
      })
    },
  }

  test = {
    signal: {
      query: async (req: QueryTestSignalRequest) => {
        let url = NBBoxUrl.command.test()
        let plain = instanceToPlain(req)
        let response = await axios.post(url, plain)
        return plainToInstance(QueryTestSignalResponse, response.data)
      },
    },
  }
}
