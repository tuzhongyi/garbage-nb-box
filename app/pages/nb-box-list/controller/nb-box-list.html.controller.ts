import { EventEmitter } from '../../../common/event-emitter'
import { NBPowerBox } from '../../../data-core/models/nb-box/nb-power-box.model'
import { NBBoxListHtmlTableController } from './nb-box-list-table.controller'

interface NBBoxListHtmlControllerEvent {
  scan(): void
  search(iemi?: string): void
  select(iemi: string): void
}

export class NBBoxListHtmlController {
  event = new EventEmitter<NBBoxListHtmlControllerEvent>()
  constructor() {
    this.regist()
  }

  private element = {
    iemi: document.getElementById('iemi') as HTMLInputElement,
    search: document.getElementById('search') as HTMLButtonElement,
    scan: document.getElementById('scan') as HTMLButtonElement,
  }

  private table = new NBBoxListHtmlTableController()

  private regist() {
    this.element.scan.addEventListener('click', () => {
      this.event.emit('scan')
    })
    this.element.search.addEventListener('click', () => {
      let value = this.element.iemi.value ? this.element.iemi.value : undefined
      this.event.emit('search', value)
    })
    this.table.event.on('select', (iemi) => {
      this.event.emit('select', iemi)
    })
  }

  clear() {
    this.table.clear()
  }

  load(datas: NBPowerBox[]) {
    this.table.load(datas)
  }
  iemi(value: string) {
    this.element.iemi.value = value
  }
}
