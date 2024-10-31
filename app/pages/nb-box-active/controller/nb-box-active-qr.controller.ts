import jsQR from 'jsqr'

export class NBBoxActiveQRController {
  tick(data: ImageData) {
    var code = jsQR(data.data, data.width, data.height, {
      inversionAttempts: 'dontInvert',
    })
    if (code) {
      return code.data
    } else {
      return undefined
    }
  }
}
