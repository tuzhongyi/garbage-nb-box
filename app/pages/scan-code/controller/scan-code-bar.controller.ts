import { BrowserBarcodeReader } from '@zxing/library'

export class ScanCodeBarController {
  codeReader = new BrowserBarcodeReader()

  data(url: string) {
    return new Promise<string | undefined>((resolve) => {
      let img = new Image()
      img.src = url
      img.onload = (e) => {
        let image = e.currentTarget as HTMLImageElement
        let _image = image.cloneNode(true) as HTMLImageElement

        this.codeReader.decodeOnce(_image, false, true).then((result) => {
          console.log(result)
          resolve(result.getText())
        })
      }
    })
  }
}
