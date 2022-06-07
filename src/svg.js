"use strict"

import * as fonts from "./fonts.js"


function getNode(name, params, innerText) {
    const ns = document.createElementNS("http://www.w3.org/2000/svg", name)
    for (let idx in params) { ns.setAttributeNS(null, idx, params[idx]) }
    if (innerText) { ns.appendChild(document.createTextNode(innerText)) }
    return ns
}


async function generateSVG({ text, fontURL, fontSize, textColor, textColor2, bgColor } = {}) {
    const length = 80  // argument?
    const fontSrc = await fonts.ttfToBase64IfLicenseAllows(fontURL)

    const svg = getNode("svg", { viewBox: `0 0 ${length} ${length}` })

    const textAttrs = {
        x: length / 2, y: length / 1.97,
        "text-anchor": "middle", "alignment-baseline": "middle",
        fill: "url(#gradient)"
    }
    const styles = `
    @font-face {
        font-family: "custom";
        src: ${fontSrc};
    }
    text {
        font: ${fontSize} custom;
    }
    `.replace(/ {2,}|[\n\r]/g, " ")

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


async function download(svgElem, typeCallable) {
    const type = typeCallable()
    const data = (new XMLSerializer()).serializeToString(svgElem)
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
    if (type && type.includes("svg")) {
        const data = await svgBlob.text()
        const url = "data:" + '<?xml version="1.0" standalone="no"?>\r\n'
            + svgBlob.type + "," + encodeURIComponent(data)
        const a = $("<a>").attr({ download: "simple-logo.svg", href: url })[0]
        a.click()
        a.remove()
        return
    }
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
