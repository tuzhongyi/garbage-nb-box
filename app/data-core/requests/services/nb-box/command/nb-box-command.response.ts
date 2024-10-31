import { Transform } from 'class-transformer'
import { transformDateTime } from '../../../../models/transformer'

export class AEPResponseEntity {
  /**	Int	电信平台定义的错误码 0为成功 其他为失败 	M */
  Code!: number
  /**	string	错误描述	M */
  Msg!: string
}
export class QueryTestSignalResponse {
  /**	bool	是否收到测试信号	M */
  IsReceive!: boolean
  /**	DateTime	收到信号的时间	D */
  @Transform(transformDateTime)
  DateTime?: Date
}
