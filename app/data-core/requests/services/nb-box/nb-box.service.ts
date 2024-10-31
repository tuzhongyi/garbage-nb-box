import axios from 'axios'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { NBPowerBox } from '../../../models/nb-box/nb-power-box.model'
import { GridModelBaseSplitPage } from '../../../models/page-list.model'
import { NBBoxUrl } from '../../../urls/nb-box/nb-box.url'
import { NBBoxCommandRequestService } from './command/nb-box-command.service'
import {
  CreateNbPowerNoxsRequest,
  CreateNbPowerNoxsResponse,
  DeleteNbPowerNoxsResponse,
} from './nb-box.param'

export class NBBoxRequestService {
  constructor() {}

  async page(page: number, rows: number, imei?: string) {
    let url = NBBoxUrl.power.all(page, rows, imei)
    let response = await axios.get<GridModelBaseSplitPage<NBPowerBox>>(url)
    let _page = plainToInstance(
      GridModelBaseSplitPage<NBPowerBox>,
      response.data
    )
    _page.Rows = plainToInstance(NBPowerBox, _page.Rows)
    return _page
  }

  async all(imei?: string) {
    let data: NBPowerBox[] = []
    let index = 1
    let paged: GridModelBaseSplitPage<NBPowerBox>
    do {
      paged = await this.page(index, 100, imei)
      data = data.concat(paged.Rows)
      index++
    } while (index <= paged.TotalPageCount)
    return data
  }

  async restart(seconds: number) {
    let url = NBBoxUrl.power.restarted(seconds)
    let response = await axios.get<NBPowerBox[]>(url)
    return plainToInstance(NBPowerBox, response.data) as NBPowerBox[]
  }
  async create(req: CreateNbPowerNoxsRequest) {
    let url = NBBoxUrl.command.create()
    let plain = instanceToPlain(req)
    let response = await axios.post(url, plain)
    let _response = plainToInstance(CreateNbPowerNoxsResponse, response.data)
    if (_response.ResultCode === 0) {
      return true
    }

    if (_response.ResultCode == 1 && _response.NBPowerBox) {
      let nbbox = plainToInstance(NBPowerBox, _response.NBPowerBox)
      let message = `数据库已存在\n添加时间:${nbbox.CreateTime.format(
        'yyyy-MM-dd HH:mm:ss'
      )}\n${nbbox.Description ?? ''}`
      throw new Error(message)
    }
    throw new Error(_response.Description)
  }

  async delete(imei: string) {
    let url = NBBoxUrl.command.delete(imei)
    let response = await axios.delete<DeleteNbPowerNoxsResponse>(url)
    return plainToInstance(DeleteNbPowerNoxsResponse, response.data)
  }

  private _command?: NBBoxCommandRequestService
  public get command(): NBBoxCommandRequestService {
    if (!this._command) {
      this._command = new NBBoxCommandRequestService()
    }
    return this._command
  }
}
