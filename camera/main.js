


const videoElement = document.getElementById("video")
const canvas = document.getElementById("canvas")

const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })

videoElement.srcObject = stream



class AsciiImage {
  constructor() {
    this.canvas = document.getElementById("canvas")
    this.wW = window.innerWidth
    this.wH = window.innerHeight
    this.canvasW = canvas.clientWidth
    this.canvasH = canvas.clientHeight
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true })
    this.spans = []

    this.generateAscii()
    this.asciiShades = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:," ^ '.` //lighter to darker
    this.divisions = Math.round(255 / this.asciiShades.length)
    this.segments = []
    for (let i = 0; i < 255; i += this.divisions) {
      this.segments.push(i) //[0,4,8,....]
    }



  }
  generateAscii() {
    const container = document.getElementById("ascii-container")
    for (let rowIndex = 0; rowIndex < this.canvasH; rowIndex++) {
      const rowDiv = container.appendChild(document.createElement("div"))
      rowDiv.id = rowIndex
      for (let columnIndex = 0; columnIndex < this.canvasW; columnIndex++) {
        const span = rowDiv.appendChild(document.createElement("span"))
        this.spans.push(span)
        span.id = `${rowIndex},${columnIndex}`
      }
    }
    console.log(this.spans.length)


  }
  update() {
    this.ctx.drawImage(videoElement, 0, 0, this.canvasW, this.canvasH)
    this.convertImage()

    setTimeout(() => {
      requestAnimationFrame(() => this.update())
    }, 1)

  }
  getAsciiShade(grayscale) { //grayscale 0-255
    let asciiIndex = 0 //lightest value index
    while (grayscale > this.segments[asciiIndex]) {
      asciiIndex++
    }
    return this.asciiShades[asciiIndex]

  }
  convertImage() {
    let imageData = this.ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight)
    let data = imageData.data
    const t = new Date()
    for (let i = 0; i < data.length; i += 4) {
      const lightness = (data[i] + data[i + 1] + data[i + 2]) / 3

      data[i] = lightness
      data[i + 1] = lightness
      data[i + 2] = lightness
      data[i + 3] = 255
      this.spans[i / 4].textContent = this.getAsciiShade(data[i])
    }
    console.log("Duration: ", new Date() - t)


    this.ctx.putImageData(imageData, 0, 0)

  }
  convertPixelToGrayScale(r, g, b) {
    const lightness = (r + g + b) / 3

    return Math.floor(lightness) //rgba 
  }
}



const ascii = new AsciiImage()
ascii.update()


