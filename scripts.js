import { IMAGES } from './images.js'
const CONTAINER = document.getElementById('container')
const TOOLTIP = document.getElementById('TOOLTIP')

for (let i = 0; i < IMAGES.length; i++) {

    const CARD = document.createElement('div')
    const INNER_IMG = document.createElement('div')
    const IMG = document.createElement('img')
    const DESCRIPTION = document.createElement('div')
    const DESCRIPTION_TEXT = document.createElement('div')
    const PALETTE = document.createElement('div')

    CONTAINER.append(CARD)
    CARD.setAttribute('class', 'card')

    CARD.append(INNER_IMG)
    INNER_IMG.setAttribute('class', 'inner_img')

    INNER_IMG.append(IMG)
    IMG.setAttribute('src', `img/IMG_0${i + 1}.${IMAGES[i][0]}`)
    IMG.setAttribute('alt', `referencia_moodboard_${i + 1}`)

    CARD.append(DESCRIPTION)
    DESCRIPTION_TEXT.setAttribute('class', 'description')

    DESCRIPTION.append(DESCRIPTION_TEXT)
    DESCRIPTION_TEXT.setAttribute('class', 'description_text')
    DESCRIPTION_TEXT.innerText = `${IMAGES[i][1]}`

    DESCRIPTION.append(PALETTE)
    PALETTE.setAttribute('class', 'palette')

    for (let j = 0; j < IMAGES[i][2].length; j++) {

        const COLOR_DIV = document.createElement('div')
        let color = ''

        PALETTE.append(COLOR_DIV)
        COLOR_DIV.setAttribute('class', `color_sample color_sample_${i + 1}`)
        COLOR_DIV.style.backgroundColor = `${IMAGES[i][2][j]}`


        COLOR_DIV.addEventListener("mouseover", (event) => {
            color = event.target.style.backgroundColor
            TOOLTIP.innerText = toHex(color)
        })

        COLOR_DIV.addEventListener("mouseout", () => {
            TOOLTIP.innerText = ''
        })

        COLOR_DIV.addEventListener("click", () => {
            navigator.clipboard.writeText(toHex(color))
            TOOLTIP.innerText = 'copiat!'
        })

        if (IMAGES[i][2][j] == '') {
            COLOR_DIV.style.backgroundImage = `url('./img/checker.jpg')`
            COLOR_DIV.style.opacity = 1
        }
    }
}

document.addEventListener('mousemove', function (event) {
    TOOLTIP.style.left = event.pageX + 'px'
    TOOLTIP.style.top = event.pageY + 'px'
})

function toHex(rgb) {
    if (rgb == '') { return 'alpha' }
    let rgb_values = rgb.match(/[0-9]+/g)
    let hex_value = rgb_values
        .map(
            (x) => {
                let hex = Math.round(x).toString(16)
                return hex.length == 1 ? '0' + hex : hex
            }
        )
        .join('')
        .toUpperCase()
    return `#${hex_value}`
}

function globalPalette() {
    const allColors = IMAGES.reduce((accumulator, image) => {
        const colors = image[2].filter(color => color !== '')
        return accumulator.concat(colors)
    }, [])

    allColors.sort()
    return allColors
}

console.log(globalPalette())


function createcolor_band() {
    const colorPalette = globalPalette()
    const color_band = document.createElement('div')

    color_band.style.display = 'flex'
    color_band.style.width = '100%'
    color_band.style.height = '30px'
    color_band.style.marginBottom = '20px'

    colorPalette.forEach(color => {
        const color_div = document.createElement('div')
        color_div.style.backgroundColor = color
        color_div.style.flexGrow = 1
        color_band.appendChild(color_div)
    })

    CONTAINER.insertBefore(color_band, CONTAINER.firstChild)
}

createcolor_band()