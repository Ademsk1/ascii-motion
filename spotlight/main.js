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
    setTimeout(() => {
      requestAnimationFrame(update)

    }, 50)
  }
  update(new Date())


  console.log(container.innerWidth)
}

main()
