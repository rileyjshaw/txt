import { autoTextSize } from 'auto-text-size'
import './style.css'

const colors = [
  { color: '#000' },
  { color: '#fff' },
  { color: '#000', stroke: '#fff' },
  { color: '#fff', bodyBackground: '#000' },
  { color: 'red' },
  { color: 'blue' },
]

const weights = [400, 700, 900]

const families = [
  'SFT Schrifted Serif Var',
  'Easy Grotesk',
  'Ernst',
  'Quasar',
  'HEX Franklin v0.3 Tyght Variable',
  'MD Nichrome',
  'TRJN DaVinci',
  'McQueen',
  'Protest Grotesk',
]

let colorIndex = 0
let weightIndex = 0
let familyIndex = 0
let italic = false

document.querySelector('#app').innerHTML = `
  <div id="txt" contenteditable="plaintext-only" role="textbox" aria-label="Text" spellcheck="false">type…</div>
`

const app = document.querySelector('#app')
const text = document.querySelector('#txt')

const updateTextSize = autoTextSize({
  innerEl: text,
  containerEl: app,
  mode: 'box',
  minFontSizePx: 1,
  maxFontSizePx: 600,
  fontSizePrecisionPx: 0.05,
})

const quoteFamily = (family) => `"${family.replaceAll('"', '\\"')}"`

function refreshSize() {
  requestAnimationFrame(updateTextSize)
}

function applyColor() {
  const preset = colors[colorIndex]

  document.body.style.background = preset.bodyBackground ?? 'transparent'
  text.style.color = preset.color
  text.style.webkitTextStroke = preset.stroke ? `0.025em ${preset.stroke}` : ''

  refreshSize()
}

function applyFont() {
  text.style.fontFamily = quoteFamily(families[familyIndex])
  text.style.fontStyle = italic ? 'italic' : 'normal'
  text.style.fontWeight = weights[weightIndex]

  refreshSize()
}

function cycleColor() {
  colorIndex = (colorIndex + 1) % colors.length
  applyColor()
}

function cycleWeight() {
  weightIndex = (weightIndex + 1) % weights.length
  applyFont()
}

function cycleFamily() {
  familyIndex = (familyIndex + 1) % families.length
  applyFont()
}

function toggleItalic() {
  italic = !italic
  applyFont()
}

window.addEventListener('keydown', (event) => {
  if (!event.metaKey || event.altKey || event.ctrlKey) return

  const key = event.key.toLowerCase()

  if (key === 'c') {
    event.preventDefault()
    cycleColor()
  } else if (key === 'i') {
    event.preventDefault()
    toggleItalic()
  } else if (key === 'b') {
    event.preventDefault()
    cycleWeight()
  } else if (key === 'f') {
    event.preventDefault()
    cycleFamily()
  }
})

text.addEventListener('input', () => {
  refreshSize()
})

document.fonts?.ready.then(refreshSize)
applyColor()
applyFont()
text.focus({ preventScroll: true })
