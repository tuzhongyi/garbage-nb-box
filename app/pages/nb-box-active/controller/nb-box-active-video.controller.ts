import { EventEmitter } from '../../../common/event-emitter'

interface NBBoxActiveVideoControllerEvent {
  tick(imageData: ImageData): void
}

export class NBBoxActiveVideoController {
  event = new EventEmitter<NBBoxActiveVideoControllerEvent>()
  constructor() {
    this.regist()
  }
  private element = {
    video: document.getElementById('video') as HTMLVideoElement,
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
    parent: document.querySelector('.video') as HTMLDivElement,
    // log: document.getElementById('log') as HTMLDivElement,
  }

  private stream?: MediaStream
  private playing = false
  private zoom = 1

  private regist() {
    this.element.canvas.addEventListener('click', () => {
      if (this.stream) {
        this.stream.getVideoTracks().forEach((track) => {
          this.zoom++
        })
      }
    })
  }

  // async zoom(track: MediaStreamTrack, value: number) {
  //   if(this.playing === false)return
  //   let constraints = { advanced: [{ zoom: value }] }
  //   return await track.applyConstraints(constraints as any)
  // }

  private get getUserMedia(): (
    constraints?: MediaStreamConstraints
  ) => Promise<MediaStream> {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return navigator.mediaDevices.getUserMedia
    }
    let _navigator = navigator as any
    return (
      _navigator.webkitGetUserMedia ||
      _navigator.mozGetUserMedia ||
      _navigator.msGetUserMedia
    )
  }

  play() {
    // this.element.video.width = this.element.parent.clientWidth
    // this.element.video.height = this.element.parent.clientHeight
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment',
          width: { min: this.element.parent.clientWidth, ideal: 1920 },
          height: { min: this.element.parent.clientWidth, ideal: 1080 },
        },
      })
      .then((stream) => {
        this.stream = stream
        this.element.video.srcObject = stream

        this.element.video.play()
        this.playing = true
        requestAnimationFrame(() => {
          this.tick()
        })
      })
  }

  stop() {
    if (this.stream) {
      this.stream.getVideoTracks().forEach((track) => {
        track.stop()
        this.playing = false
      })
    }
  }

  private tick() {
    if (this.playing === false) return
    this.element.canvas.width = this.element.parent.clientWidth
    this.element.canvas.height = this.element.parent.clientWidth

    // let videotext = `video:${this.element.video.videoWidth}x${this.element.video.videoHeight}`
    // let canvasText = `canvas:${this.element.canvas.width}x${this.element.canvas.height}`
    // this.element.log.innerText = `${videotext}\n${canvasText}`

    let ctx = this.element.canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.drawImage(
      this.element.video,
      this.zoom <= 1 ? 0 : this.element.video.videoWidth / this.zoom / 2,
      this.zoom <= 1 ? 0 : this.element.video.videoHeight / this.zoom / 2,
      this.element.video.videoWidth / this.zoom,
      this.element.video.videoHeight / this.zoom,
      0,
      0,
      this.element.canvas.width,
      this.element.canvas.height
    )
    let data = ctx.getImageData(
      0,
      0,
      this.element.canvas.width,
      this.element.canvas.height
    )

    let pixels = data.data
    for (let i = 0, len = pixels.length; i < len; i += 4) {
      data.data[i] = 255 - data.data[i]
      data.data[i + 1] = 255 - data.data[i + 1]
      data.data[i + 2] = 255 - data.data[i + 2]
    }
    this.event.emit('tick', data)
    requestAnimationFrame(() => {
      this.tick()
    })
  }
}
