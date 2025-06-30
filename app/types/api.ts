export type DataT = any

export type CoreApiResponse<DataT> = {
  Code: number
  Data: DataT
  Message?: string
}

/**
 * API 回應錯誤時的型別 class
 */
export class CoreApiErrorResponse<DataT> implements CoreApiResponse<DataT> {
  Code: number
  Data: DataT
  Message?: string

  constructor(response: CoreApiResponse<DataT>) {
    this.Code = response.Code
    this.Data = response.Data
    this.Message = response.Message
  }
}

export type ApiOptions = {
  alert?: boolean
}
