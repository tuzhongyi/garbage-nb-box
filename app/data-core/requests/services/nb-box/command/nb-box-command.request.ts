import { Transform } from 'class-transformer'
import { transformDateTime } from '../../../../models/transformer'

export class GetDeviceStatusHistoryRequest {
  imei!: string
  @Transform(transformDateTime)
  BeginTime?: Date
  @Transform(transformDateTime)
  EndTime?: Date
}
export class QueryTestSignalRequest {
  /**	string	电信IMEI号	M */
  Imei!: string
  /**	int	多少秒内的测试信号	M */
  Seconds!: number
}
