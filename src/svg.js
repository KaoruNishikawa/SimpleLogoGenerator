"use strict"

import * as fonts from "./fonts.js"


function getNode(name, params, innerText) {
    const ns = document.createElementNS("http://www.w3.org/2000/svg", name)
    for (let idx in params) { ns.setAttributeNS(null, idx, params[idx]) }
    if (innerText) { ns.appendChild(document.createTextNode(innerText)) }
    return ns
}


async function generateSVG({ text, fontURL, font, textColor, bgColor } = {}) {
    const length = 80  // argument?
    const fontSrc = await fonts.ttfToBase64IfLicenseAllows(fontURL)

    const svg = getNode("svg", { viewBox: `0 0 ${length} ${length}` })

    const textAttrs = {
        x: length / 2, y: length / 2,
        "text-anchor": "middle", "alignment-baseline": "middle"
    }
    const styles = `
@font-face {
    font-family: "custom";
    src: ${fontSrc};
}
text {
    font: ${font ? font : "20px"} custom;
    fill: ${textColor};
}
    `

    const contents = [
        getNode("style", {}, styles),
        getNode("rect", { x: 0, y: 0, width: "100%", height: "100%", fill: bgColor }),
        getNode("text", textAttrs, text)
    ]

    contents.map(node => svg.appendChild(node))
    return svg
}


function toURI(svgElem) {
    const textSVG = (new XMLSerializer()).serializeToString(svgElem)
    const source = '<?xml version="1.0" standalone="no"?>\r\n' + textSVG
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source)
}


export { generateSVG, toURI }
