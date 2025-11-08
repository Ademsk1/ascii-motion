


const videoElement = document.getElementById("video")
const canvas = document.getElementById("canvas")

const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })

videoElement.srcObject = stream
console.log(stream)
// navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//   videoElement.srcObject = stream
// })


class AsciiImage {
  constructor() {
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true })
    this.asciiShades = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:," ^ '.`
  }
  update() {
    this.ctx.drawImage(videoElement, 0, 0, canvas.clientWidth, canvas.clientHeight)
    this.convertImage()


    setTimeout(() => {

      requestAnimationFrame(() => this.update())
    }, 300)

  }
  convertImage() {
    let imageData = this.ctx.getImageData(0, 0, 400, 400)
    let data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const lightness = this.convertPixelToGrayScale(...data.slice(i, i + 4))
      data[i] = lightness
      data[i + 1] = lightness
      data[i + 2] = lightness
      data[i + 3] = 255
    }
    this.ctx.putImageData(imageData, 0, 0)

  }
  convertPixelToGrayScale(r, g, b, a) {
    const lightness = (r + g + b) / 3

    return Math.floor(lightness) //rgba 
  }
}



const ascii = new AsciiImage()
ascii.update()


