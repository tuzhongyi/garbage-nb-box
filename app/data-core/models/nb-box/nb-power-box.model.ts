import { Transform } from 'class-transformer'
import { IIdModel } from '../model.interface'
import { transformDateTime } from '../transformer'

/**	1.1. 电箱实体类（NBPowerBox）	*/
export class NBPowerBox implements IIdModel {
  /**	string	Id	M	*/
  Id!: string
  /**	string	移动设备码	M	*/
  IEMI!: string
  /**
   * string
   * 添加到电信平台后，电信平台生成的Id
   * 向电信平台创建下发指令，查询历史等操作都会用到
   * M
   **/
  DeviceId!: string
  /**	string	电箱名称	M	*/
  BoxName!: string
  /**	string	温度	D	*/
  Temperature?: string
  /**	string	湿度	D	*/
  Humidity?: string
  /**
   * string
   * 信号强度 0-无信号，
   * 其他1-100信号强度，原有电信平台信号按数值+1处理，99=0。
   * 如果没有信号读数，该数值为null。
   * O
   **/
  Signal?: string
  /**	string	"220v状态 0-无 1-有 2-重启测试
   * 没有读数，该数值为null"	D	*/
  Voltage220?: string
  /**	string	电池电压百分比，0-100，不要有百分号	D	*/
  Voltage12?: string
  /**	string	NB电源箱状态，0-正常，1-告警	D	*/
  Status?: string

  @Transform(transformDateTime) CreateTime!: Date
  /**	DateTime	"心跳时间
   * 2024-08-06T10:22:54+08:00"	D	*/
  @Transform(transformDateTime) HeartTime?: Date
  /**	DateTime	"告警时间
   * 2024-08-06T10:22:54+08:00"	D	*/
  @Transform(transformDateTime) AlarmTime?: Date
  /**	DateTime	"按板子重启按钮时间
   * 2024-08-06T10:22:54+08:00"	D	*/
  @Transform(transformDateTime) PressTime?: Date
  /**	DateTime	"12v 或 5v的重启时间
   * 2024-08-06T10:22:54+08:00"	D	*/
  @Transform(transformDateTime) ReStartTime?: Date
  /**	string	描述	D	*/
  Description?: string
}
