import '../../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../../common/event-emitter'
import { Language } from '../../../common/language'
import { LocaleCompare } from '../../../common/tools/compare-tool/compare.tool'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { NBPowerBox } from '../../../data-core/models/nb-box/nb-power-box.model'
interface NBBoxListHtmlTableControllerEvent {
  select(iemi: string): void
}
export class NBBoxListHtmlTableController {
  event = new EventEmitter<NBBoxListHtmlTableControllerEvent>()
  constructor() {
    this.init()
  }

  private table = document.getElementById('table') as HTMLTableElement

  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private thead = document.querySelector(
    '#table thead'
  ) as HTMLTableSectionElement

  private widths = ['60px', 'auto', '100px']
  private datas: NBPowerBox[] = []

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  load(datas: NBPowerBox[]) {
    this.datas = datas.sort((a, b) => LocaleCompare.compare(a.IEMI, b.IEMI))

    for (let i = 0; i < this.datas.length; i++) {
      let item = this.datas[i]
      let columns: any[] = [
        (i + 1).toString(),
        item.IEMI,
        {
          class: `status-${item.Status}`,
          text: Language.NBBoxStatus(item.Status),
        },
      ]
      let row = HtmlTool.table.append(this.tbody, columns)
      row.addEventListener('click', () => {
        this.event.emit('select', item.IEMI)
      })
    }
  }
}
