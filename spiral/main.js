import Ascii from "../lib/main.js";



class AsciiSpiral extends Ascii {
  constructor() {
    super()
  }
  getDistance(mouseX, mouseY, charX, charY) {
    return Math.sqrt((mouseX - charX) ** 2 + (mouseY - charY) ** 2)
  }

  async run(mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2, t, spiralFreq) {

    this.element.textContent = ""
    let content = ""
    for (let i = 0; i < this.charCount; i++) {
      const { x, y } = this.getCharCoordinates(i)
      const angle = this.getAngle({ mouseX, mouseY, charX: x, charY: y })
      const distance = this.getDistance(mouseX, mouseY, x, y)
      const char = this.chooseChar(angle, distance, t, spiralFreq)
      content += char
    }
    this.element.textContent = content
  }
  chooseChar(angle, distance, t, spiralFreq) {
    if (angle < 0) angle += Math.PI

    const chars = ["z", "b", "|", "@"] //because 0,0 is at the top left corner, this needs to be inverted to have the \ before the / . Coordinates!! 
    const index = Math.round((angle / (Math.PI / 4)) + t + Math.cos(spiralFreq * distance / Math.sqrt(window.innerHeight ** 2 + window.innerWidth ** 2)) ** 2)//round to nearest 45 degree val. 

    return chars[index % chars.length]
  }
}



async function main() {
  const params = new URLSearchParams(window.location.search);
  const rawValue = params.get("frequency"); // "123"
  let spiralFreq = parseFloat(rawValue);
  if (isNaN(spiralFreq)) {
    spiralFreq = 1
  }
  const ascii = new AsciiSpiral()
  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
  })
  window.addEventListener("resize", () => ascii.setDimensions(window.innerWidth, window.innerHeight))

  function update(t = 0) {
    ascii.run(mouseX, mouseY, t * 1e-3, spiralFreq)
    setTimeout(() => {
      requestAnimationFrame(update)

    }, 50)
    // requestAnimationFrame(update)
  }
  update()

  console.log(container.innerWidth)
}

main()


