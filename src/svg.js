"use strict"

import * as fonts from "./fonts.js"


/**
 * Get SVG node.
 * @param {string} name - Name of the tag.
 * @param {Object} params - Attributes to assign in the tag.
 * @param {string} [innerText] - Text to put, if any.
 * @returns {Element} SVG element with given properties.
 */
function getNode(name, params, innerText) {
    const ns = document.createElementNS("http://www.w3.org/2000/svg", name)
    for (let idx in params) { ns.setAttributeNS(null, idx, params[idx]) }
    if (innerText) { ns.appendChild(document.createTextNode(innerText)) }
    return ns
}


/**
 * Get coordinate of corners of a square, in %.
 * @param {Object} rotationParams - Properties of rotational transform.
 * @param {[int, int]} [rotationParams.center=[0, 0]] - Center of the rotation, in %.
 * @param {number} rotationParams.angleDeg - Angle of the rotation, in deg.
 * @returns {[string, string, string, string]} [x1, y1, x2, y2] coordinates.
 */
function getSquareCornersInPercent({ center = [0, 0], angleDeg }) {
    const angleRad = angleDeg * Math.PI / 180
    const x1 = Math.round(50 + Math.sin(angleRad) * 50) + "%"
    const x2 = Math.round(50 - Math.sin(angleRad) * 50) + "%"
    const y1 = Math.round(50 + Math.cos(angleRad) * 50) + "%"
    const y2 = Math.round(50 - Math.cos(angleRad) * 50) + "%"
    return [x1, y1, x2, y2]
}


/**
 * Generate a SVG logo.
 * @param {Object} logoParams - Logo properties.
 * @param {string} logoParams.text - Text to put in the logo.
 * @param {string} logoParams.fontURL - URL to a font file you want to use.
 * @param {Object} logoParams.textStyle - Style of logo text.
 * @param {string} logoParams.textStyle.color1 - Color of the text.
 * @param {string} [logoParams.textStyle.color2] - Text color, at the end of gradient.
 * @param {int} logoParams.textStyle.gradWidth - Starting point of gradient, [0, 50]%.
 * @param {number} logoParams.textStyle.gradAngleDeg - Angle of color gradient, in deg.
 * @param {string |int} logoParams.textStyle.size - Font size.
 * @param {[int, int]} logoParams.textStyle.offset - [x, y] offset of the text, in %.
 * @param {Object} logoParams.bgStyle - Style of logo background.
 * @param {string} logoParams.bgStyle.color1 - Color of the background.
 * @param {string} [logoParams.bgStyle.color2] - Background color, at the end of gradient.
 * @param {int} logoParams.bgStyle.gradWidth - Starting point of gradient, [0, 50]%.
 * @param {number} logoParams.bgStyle.gradAngleDeg - Angle of color gradient, in deg.
 * @param {int} logoParams.bgStyle.opacity - Opacity of the background.
 * @param {[int, int]} logoParams.size - [x, y] size of the logo image, in px.
 * @returns {Promise.<SVGElement>} Generated logo.
 */
async function generateSVG({ text, fontURL, textStyle, bgStyle, size }) {
    const fontSrc = await fonts.ttfToBase64IfLicenseAllows(fontURL)

    const [lengthX, lengthY] = size
    const svg = getNode("svg", { viewBox: `0 0 ${lengthX} ${lengthY}` })

    const textAttrs = {
        x: lengthX * (50 + textStyle.offset[0]) / 100,
        y: lengthY * (50 + textStyle.offset[1]) / 100,
        "text-anchor": "middle",
        "alignment-baseline": "middle",
        fill: "url(#gradient)"
    }
    const styles = `
    @font-face {
        font-family: "custom";
        src: ${fontSrc};
    }
    text {
        font: ${textStyle.size} custom;
    }
    `.replace(/ {2,}|[\n\r]/g, " ")

    const [x1, y1, x2, y2] = getSquareCornersInPercent({
        angleDeg: textStyle.gradAngleDeg
    })
    const [bgX1, bgY1, bgX2, bgY2] = getSquareCornersInPercent({
        angleDeg: bgStyle.gradAngleDeg
    })
    const contents = [
        $(getNode("defs", {})).append(
            $(getNode("linearGradient", {
                id: "gradient",
                x1: x1, x2: x2, y1: y1, y2: y2,
                gradientUnits: "userSpaceOnUse"
            })).append(
                getNode("stop", {
                    "stop-color": textStyle.color1,
                    offset: `${50 - textStyle.gradWidth}%`
                })
            ).append(
                getNode("stop", {
                    "stop-color": textStyle.color2 || textStyle.color1,
                    offset: `${50 + textStyle.gradWidth}%`
                })
            ),
            $(getNode("linearGradient", {
                id: "bg-gradient",
                x1: bgX1, x2: bgX2, y1: bgY1, y2: bgY2,
                gradientUnits: "userSpaceOnUse"
            })).append(
                getNode("stop", {
                    "stop-color": bgStyle.color1,
                    offset: `${50 - bgStyle.gradWidth}%`
                })
            ).append(
                getNode("stop", {
                    "stop-color": bgStyle.color2 || bgStyle.color1,
                    offset: `${50 + bgStyle.gradWidth}%`
                })
            ),
        )[0],
        getNode("style", {}, styles),
        getNode("rect", {
            x: 0, y: 0,
            width: "100%", height: "100%",
            fill: "url(#bg-gradient)", "fill-opacity": bgStyle.opacity + "%",
        }),
        getNode("text", textAttrs, text)
    ]

    contents.map(node => svg.appendChild(node))
    return svg
}


/**
 * Download the logo in specified file type.
 * @param {SVGElement} svgElem - SVG element the logo is drawn.
 * @param {function(): string} typeCallable - Function to get the output extension.
 * @returns {Promise.<void>}
 */
async function download(svgElem, typeCallable) {
    const type = typeCallable()
    const data = (new XMLSerializer()).serializeToString(svgElem)
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
    if (type && type.includes("svg")) {
        console.info("Saving logo as SVG...")
        const data = await svgBlob.text()
        const url = "data:" + '<?xml version="1.0" standalone="no"?>\r\n'
            + svgBlob.type + "," + encodeURIComponent(data)
        const a = $("<a>").attr({ download: "simple-logo.svg", href: url })[0]
        a.click()
        a.remove()
        return
    }
    console.info(`Saving logo as ${type}...`)
    /* https://takuti.me/note/javascript-save-svg-as-image */
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.addEventListener("load", () => {
        const bbox = svgElem.getBBox()
        const $canvas = $("<canvas>").attr({ width: bbox.width, height: bbox.height })
        const context = $canvas[0].getContext("2d")
        context.drawImage(img, 0, 0, bbox.width, bbox.height)
        URL.revokeObjectURL(url)

        const extension = /[a-z]*$/.exec(type)[0]  // For MIME type format. Not used.
        const a = $("<a>").attr({
            download: `simple-logo.${extension}`, href: $canvas[0].toDataURL()
        })[0]
        a.click()
        a.remove()
    })
    img.src = url
}


export { generateSVG, download }
