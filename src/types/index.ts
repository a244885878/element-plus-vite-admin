/**
 * @description 全局接口文件
 */

// Table-column
export interface TableColumnData {
  type?: string
  index?: any
  label?: string
  columnKey?: string
  prop?: string
  width?: string | number
  minWidth?: string | number
  fixed?: string | boolean
  renderHeader?: any
  sortable?: boolean | string
  sortMethod?: any
  sortBy?: any
  sortOrders?: any
  resizable?: boolean
  formatter?: any
  showOverflowTooltip?: boolean
  align?: string
  headerAlign?: string
  className?: string
  labelClassName?: string
  selectable?: any
  reserveSelection?: boolean
  filters?: any
  filterPlacement?: string
  filterMultiple?: boolean
  filterMethod?: any
  filteredValue?: any
  formatAmount?: boolean
  required?: boolean
  headTooltip?: string
  child?: TableColumnData[]
}

// 分页
export interface Paging {
  pageNum?: number
  pageSize?: number
}

export interface BaseState {
  total: number
  tableData: Record<string, any>[]
  loading: boolean
  row: any
  tableColumnData: TableColumnData[]
  formItemWidth: string | number
}
