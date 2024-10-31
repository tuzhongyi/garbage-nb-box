import { Transform } from 'class-transformer'
import { IModel } from '../model.interface'
import { transformDateTime } from '../transformer'

/**	1.1. 从电信平台获取的设备历史（DeviceState）	*/
export class DeviceState implements IModel {
  /**	DateTime	时间  2024-08-06T10:22:54+08:00"	M	*/
  @Transform(transformDateTime)
  DateTime!: Date
  /**	string	移动设备编码	M	*/
  IMEI!: string
  /**	string	"信号强度 0-无信号，
   * 其他1-100信号强度，原有电信平台信号按数值+1处理，99=0。
   * 如果没有信号读数，该数值为null。"	O	*/
  Signal?: string
  /**	string	温度	O	*/
  Temperature?: string
  /**	string	"220v状态 0-无 1-有 2-重启测试
   * 没有读数，该数值为null"	O	*/
  Voltage220?: string
  /**	string	电池电压百分比，0-100	O	*/
  Voltage12?: string
}
