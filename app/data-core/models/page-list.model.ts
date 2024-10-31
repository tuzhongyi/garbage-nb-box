import { IModel } from './model.interface'

/** 分页数据 */
export class GridModelBaseSplitPage<T> implements IModel {
  /**	int	当前第几页	M */
  CurPage!: number
  /**	int	总页数	M */
  TotalPageCount!: number
  /**	int	当前页条数	M */
  CountPerPage!: number
  /**	int	总条数	M */
  TotalCount!: number
  /**	List<T>	数据	M */
  Rows!: T[]
}
