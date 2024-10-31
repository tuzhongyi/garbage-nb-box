import { IWindowQuery, WindowModel } from '../../data-core/models/window.model'

export class NBBoxListWindow {
  testing = new TestingWindow()
  code = new ScanCodeWindow()
}

interface TestingWindowQuery extends IWindowQuery {
  imei?: string
}
class TestingWindow extends WindowModel<TestingWindowQuery> {
  style = {
    width: '70%',
  }
  url = '../nb-box-testing/nb-box-testing.html'
}
class ScanCodeWindow extends WindowModel {
  url = '../scan-code/scan-code.html'
  style = {
    width: '70%',
    aspectRatio: '0.7',
  }
}
