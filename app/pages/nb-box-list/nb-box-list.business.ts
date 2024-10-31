import { NBBoxRequestService } from '../../data-core/requests/services/nb-box/nb-box.service'

export class NBBoxListBusiness {
  private service = new NBBoxRequestService()
  load(imei?: string) {
    return this.service.all(imei)
  }
}
