export abstract class WindowModel<T extends IWindowQuery = any> {
  query: T = {} as T

  style: any = {}
  abstract url: string
}

export interface IWindowQuery {
  [key: string]: string | undefined
}

export interface ResultArgs {
  result: boolean
  message?: string
  inner?: boolean
}
