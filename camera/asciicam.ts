


const SHADES = `\`.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@`
const DENSITIES = [0, 0.0751, 0.0829, 0.0848, 0.1227, 0.1403, 0.1559, 0.185, 0.2183, 0.2417, 0.2571, 0.2852, 0.2902, 0.2919, 0.3099, 0.3192, 0.3232, 0.3294, 0.3384, 0.3609, 0.3619, 0.3667, 0.3737, 0.3747, 0.3838, 0.3921, 0.396, 0.3984, 0.3993, 0.4075, 0.4091, 0.4101, 0.42, 0.423, 0.4247, 0.4274, 0.4293, 0.4328, 0.4382, 0.4385, 0.442, 0.4473, 0.4477, 0.4503, 0.4562, 0.458, 0.461, 0.4638, 0.4667, 0.4686, 0.4693, 0.4703, 0.4833, 0.4881, 0.4944, 0.4953, 0.4992, 0.5509, 0.5567, 0.5569, 0.5591, 0.5602, 0.5602, 0.565, 0.5776, 0.5777, 0.5818, 0.587, 0.5972, 0.5999, 0.6043, 0.6049, 0.6093, 0.6099, 0.6465, 0.6561, 0.6595, 0.6631, 0.6714, 0.6759, 0.6809, 0.6816, 0.6925, 0.7039, 0.7086, 0.7235, 0.7302, 0.7332, 0.7602, 0.7834, 0.8037, 0.9999]


class AsciiRender {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private container: HTMLDivElement
  private rows: HTMLDivElement[]
  private mappedAscii: string[]
  private canvas: HTMLCanvasElement
  constructor(canvas: HTMLCanvasElement, containerDiv: HTMLDivElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.width = canvas.clientWidth
    this.height = canvas.clientHeight
    this.container = containerDiv
    this.rows = []
    this.mappedAscii = []
  }
  /**
   *  Generates a 256 length array, that distributes the provided ascii characters out based on their 
   *  mapped densities. An example is something like 
   * 
   *  ['@', '@', '@', '&', '%',  ...], 
   *  
   * This allows for quick index matching grayscale value to an ascii character
   *  
   */
  initialisePixelMappings(chars: string | string[], densities: number[]) {
    if (densities.some(density => density > 1 || density < 0)) {
      throw new Error("Density values are out of range. Must be between 0 and 1.")
    }
    if (chars.length != densities.length) {
      throw new Error("The number of density values must match the number of characters provided")
    }
    let currentDensityIndex = 0
    for (let i = 0; i < 256; i++) {
      if (densities[currentDensityIndex + 1] * 256 < i) {
        currentDensityIndex++
      }
      this.mappedAscii.push(chars[currentDensityIndex])
    }

  }

  initialiseAsciiRowComponents() {
    for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
      const rowDiv = this.container.appendChild(document.createElement("div"))
      rowDiv.id = `${rowIndex}`
      this.rows.push(rowDiv)
    }
  }
  clearAscii() {
    this.container.childNodes.forEach(node => node.remove())
  }



  render(imageData: ImageData) {
    const { data } = imageData
    let rowIndex = 0
    let line = ''
    for (let i = 0; i < data.length; i += 4) {
      // if the pixel index is greater than the current number of rows multiplied by the number of pixels on that row 
      // i.e. have we finished a row yet?
      if (i / 4 > (rowIndex + 1) * this.width) {
        this.rows[rowIndex].textContent = line.split("").reverse().join(' ') + '\n'
        rowIndex++
        line = ''
      }
      const lightness = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = lightness
      data[i + 1] = lightness
      data[i + 2] = lightness
      data[i + 3] = 255
      line += this.mappedAscii[data[i]] // add spacing for more accurate aspect ratio
    }
  }

  setDimensions(x: number, y: number) {

  }
  setQuality(quality: 'low' | 'medium' | 'high') {

  }
  setZoom(zoom: number) {
  }

}