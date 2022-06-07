"use strict"

import * as fonts from "./fonts.js"


function getNode(name, params, innerText) {
    const ns = document.createElementNS("http://www.w3.org/2000/svg", name)
    for (let idx in params) { ns.setAttributeNS(null, idx, params[idx]) }
    if (innerText) { ns.appendChild(document.createTextNode(innerText)) }
    return ns
}


async function generateSVG({ text, fontURL, font, textColor, textColor2, bgColor } = {}) {
    const length = 80  // argument?
    const fontSrc = await fonts.ttfToBase64IfLicenseAllows(fontURL)

    const svg = getNode("svg", { viewBox: `0 0 ${length} ${length}` })

    const textAttrs = {
        x: length / 2, y: length / 2,
        "text-anchor": "middle", "alignment-baseline": "middle",
        fill: "url(#gradient)"
    }
    const styles = `
@font-face {
    font-family: "custom";
    src: ${fontSrc};
}
text {
    font: ${font ? font : "20px"} custom;
}
    `

    const contents = [
        $(getNode("defs", {})).append(
            $(getNode("linearGradient", {
                id: "gradient",
                x1: 0, x2: "100%", y1: 0, y2: "100%",
                gradientUnits: "userSpaceOnUse"
            })).append(
                getNode("stop", { "stop-color": textColor, offset: "0%" })
            ).append(
                getNode("stop", { "stop-color": textColor2 || textColor, offset: "100%" })
            )
        )[0],
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
