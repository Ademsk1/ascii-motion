import Ascii from "../lib/main.js"

async function main() {

  const ascii = new Ascii()
  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
  })
  window.addEventListener("resize", () => ascii.setDimensions(window.innerWidth, window.innerHeight))

  function update(t) {
    ascii.run(mouseX, mouseY, t * 1e-3)
    requestAnimationFrame(update)
  }
  update(new Date())
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
