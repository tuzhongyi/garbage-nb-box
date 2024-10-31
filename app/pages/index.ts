import './index.less'
export namespace Index {
  class Controller {
    constructor() {
      this.regist()
    }

    private element = {
      list: document.getElementById('list') as HTMLButtonElement,
      code: {
        scan: document.getElementById('scan-code') as HTMLButtonElement,
      },
    }

    private regist() {
      this.element.list.addEventListener('click', () => {
        location.href = '/nb-box-list/nb-box-list.html'
      })
      this.element.code.scan.addEventListener('click', () => {
        location.href = '/main.html'
      })
    }
  }

  const controller = new Controller()
}
