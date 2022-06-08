"use strict"

import * as fonts from "./fonts.js"


function getNode(name, params, innerText) {
    const ns = document.createElementNS("http://www.w3.org/2000/svg", name)
    for (let idx in params) { ns.setAttributeNS(null, idx, params[idx]) }
    if (innerText) { ns.appendChild(document.createTextNode(innerText)) }
    return ns
}


async function generateSVG({ text, fontURL, textSize, textColor, textColor2, bgColor1, bgColor2, gradAngleDeg, gradShrink, bgGradAngleDeg, bgGradShrink, textOffset = [0, 0], logoSize = [0, 0] } = {}) {
    const lengthX = parseInt(logoSize[0])
    const lengthY = parseInt(logoSize[1])
    const fontSrc = await fonts.ttfToBase64IfLicenseAllows(fontURL)

    const svg = getNode("svg", { viewBox: `0 0 ${lengthX} ${lengthY}` })

    const textAttrs = {
        x: lengthX * (50 + parseInt(textOffset[0])) / 100,
        y: lengthY * (50 + parseInt(textOffset[1])) / 100,
        "text-anchor": "middle", "alignment-baseline": "middle",
        fill: "url(#gradient)"
    }
    const styles = `
    @font-face {
        font-family: "custom";
        src: ${fontSrc};
    }
    text {
        font: ${textSize} custom;
    }
    `.replace(/ {2,}|[\n\r]/g, " ")

    const gradAngleRad = gradAngleDeg * Math.PI / 180
    const x1 = Math.round(50 + Math.sin(gradAngleRad) * 50) + "%"
    const x2 = Math.round(50 - Math.sin(gradAngleRad) * 50) + "%"
    const y1 = Math.round(50 + Math.cos(gradAngleRad) * 50) + "%"
    const y2 = Math.round(50 - Math.cos(gradAngleRad) * 50) + "%"

    const bgGradAngleRad = bgGradAngleDeg * Math.PI / 180
    const bgX1 = Math.round(50 + Math.sin(bgGradAngleRad) * 50) + "%"
    const bgX2 = Math.round(50 - Math.sin(bgGradAngleRad) * 50) + "%"
    const bgY1 = Math.round(50 + Math.cos(bgGradAngleRad) * 50) + "%"
    const bgY2 = Math.round(50 - Math.cos(bgGradAngleRad) * 50) + "%"

    const contents = [
        $(getNode("defs", {})).append(
            $(getNode("linearGradient", {
                id: "gradient",
                x1: x1, x2: x2, y1: y1, y2: y2,
                gradientUnits: "userSpaceOnUse"
            })).append(
                getNode("stop", { "stop-color": textColor, offset: `${gradShrink}%` })
            ).append(
                getNode("stop", { "stop-color": textColor2 || textColor, offset: `${100 - gradShrink}%` })
            ),
            $(getNode("linearGradient", {
                id: "bg-gradient",
                x1: bgX1, x2: bgX2, y1: bgY1, y2: bgY2,
                gradientUnits: "userSpaceOnUse", //gradientTransform: `rotate(${bgGradAngleDeg})`
            })).append(
                getNode("stop", { "stop-color": bgColor1, offset: `${bgGradShrink}%` })
            ).append(
                getNode("stop", { "stop-color": bgColor2 || textColor, offset: `${100 - bgGradShrink}%` })
            ),
        )[0],
        getNode("style", {}, styles),
        getNode("rect", { x: 0, y: 0, width: "100%", height: "100%", fill: "url(#bg-gradient)" }),
        getNode("text", textAttrs, text)
    ]

    contents.map(node => svg.appendChild(node))
    return svg
}


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

        const extension = /[a-z]*$/.exec(type)[0]  // For content type format. Not used.
        const a = $("<a>").attr({
            download: `simple-logo.${extension}`, href: $canvas[0].toDataURL()
        })[0]
        a.click()
        a.remove()
    })
    img.src = url
}


export { generateSVG, download }
