import { CreateNbPowerNoxsRequest } from '../../data-core/requests/services/nb-box/nb-box.param'
import { NBBoxRequestService } from '../../data-core/requests/services/nb-box/nb-box.service'

export class NBBoxActiveBusiness {
  private service = new NBBoxRequestService()

  active(imei: string) {
    let req = new CreateNbPowerNoxsRequest()
    req.Imei = imei
    return this.service.create(req)
  }
}
