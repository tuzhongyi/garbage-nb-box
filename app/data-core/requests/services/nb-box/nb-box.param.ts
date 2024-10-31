import { NBPowerBox } from '../../../models/nb-box/nb-power-box.model'
import { IParams } from '../../../models/params.interface'

export class CreateNbPowerNoxsRequest implements IParams {
  /**	string	电信IMEI号	M */
  Imei!: string
  /**	string	设备添加描述，或者备注	D */
  Description?: string
}
export class CreateNbPowerNoxsResponse {
  /**	int	0为添加成功，1为数据库已存在，2电信平台已存在 3添加失败	M */
  ResultCode!: number
  /**	NBPowerBox	ResultCode 为1时的已存在的数据，其他情况为空	D */
  NBPowerBox?: NBPowerBox
  /**	string	描述	D */
  Description?: string
}
export class DeleteNbPowerNoxsResponse {
  /**	bool	删除是否成功	M */
  Sucess!: boolean
  /**	string	描述	M */
  Remark!: string
}
