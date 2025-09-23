
/**
 * We're setting out to get a website that can follow the mouse, and adaptively change the text content within that. 
 * We need the mouses current position, the characters position, and then we can figure out the character needed
 *        / - \ | are the directions we have
 * 
 *      we can treat the char position as the cardinal. 
 *    
 */

const SEGMENTS_DEG = [0, 22.5, 67.5, 112.5, 157.5, 180]
const SEGMENTS_RAD = SEGMENTS_DEG.map((v) => v * Math.PI / 180)


function getAngle({ mouseX, mouseY, charX, charY }) {
  let x = mouseX - charX
  const y = mouseY - charY
  if (x === 0) { x += 0.1 } // remove chance of NaN result 

  return Math.atan(y / x) //only use the top half circle in an x-y graph
}

function deg2rad(deg) {
  return deg * Math.PI / 180
}

function chooseChar(angle) {
  if (angle < 0) angle += Math.PI
  const chars = ["-", "/", "|", "\\", "-"] //because 0,0 is at the top left corner, this needs to be inverted to have the \ before the / . Coordinates!! 
  const index = Math.round(angle / (Math.PI / 4)) //round to nearest 45 degree val. 

  return chars[index]

}

function getXYFromPosition() {

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



class Ascii {
  constructor() {

    this.element = document.getElementById("container")

    this.charWidth = 7.83
    this.charHeight = 15
    this.element = document.getElementById("container")
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.rowCount = Math.floor(this.windowWidth / this.charWidth)
    this.lineCount = Math.floor(this.windowHeight / this.charHeight)
    this.charCount = this.rowCount * this.lineCount
    this.setup()
  }


  getCharCoordinates(index) {
    const row = Math.floor(index / this.rowCount)
    const y = row * this.charHeight
    const charOffset = index % this.rowCount
    const x = charOffset * this.charWidth
    return { x, y }
  }
  async welcome() {
    const { innerWidth, innerHeight } = window
    const container = document.getElementById("container")
    // await this.printText("Welcome to this weird code!")
    // await sleep(200)
    // await this.printText("Testing character sizes!")
    // await sleep(500)
    // await this.clearText()
    await this.printText("/")

    // this.charWidth = this.element.clientWidth
    // this.charHeight = this.element.clientHeight
    await this.clearText()
    // await this.printText(`char width: ${this.charWidth}. window width: ${window.innerWidth}\nwindow height: ${window.innerHeight} `)
  }

  async setup() {
    await this.welcome()

    for (let i = 0; i < this.lineCount; i++) {
      this.element.textContent = "-".repeat(this.rowCount)
    }
  }

  async run(mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2) {
    this.element.textContent = ""
    console.log({ mouseX, mouseY })
    for (let i = 0; i < this.charCount; i++) {
      const { x, y } = this.getCharCoordinates(i)
      const angle = getAngle({ mouseX, mouseY, charX: x, charY: y })
      const char = chooseChar(angle)
      this.element.textContent += char
    }
  }

  async printText(text) {
    for (let i = 0; i < text.length; i++) {
      await sleep(75)
      this.element.textContent += text[i]
    }

  }

  async clearText(lengthToRemove = this.element.textContent.length) {

    const contentLength = this.element.textContent.length
    for (let i = contentLength; i >= contentLength - lengthToRemove; i--) {
      await sleep(25)
      this.element.textContent = this.element.textContent.slice(0, i)
    }
  }
}

async function main() {

  const ascii = new Ascii()
  document.addEventListener("mousemove", (event) => ascii.run(event.clientX, event.clientY))

  // const { innerWidth, innerHeight } = window
  // const container = document.getElementById("container")
  // await printText(container, "Welcome to this weird code!")
  // await sleep(500)
  // await clearText(container)
  // await printText(container, "Testing character sizes!")
  // await sleep(500)
  // await clearText(container)
  // await printText(container, "/")

  console.log(container.innerWidth)
}

main()


/////////////


function testGetChar() {
  const mouseX = 4, mouseY = 4, charX = 0, charY = 0
  const result = getChar({ mouseX, mouseY, charX, charY })
  console.log(result * 180 / Math.PI)
}

// function testChooseChar() {
//   const testAngles = [10, 55, 22.5, 67.8, 90, 150, 170]
//   const expectedChars = ["-", "/", "/", "|", "|", "\\", "-", "\\"]
//   for (let i = 0; i < testAngles.length; i++) {
//     const char = chooseChar(testAngles[i])
//     console.log("char: ", char, "expected: ", expectedChars[i])
//   }
// }
// testChooseChar()