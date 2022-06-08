"use strict"


async function loadFontList() {
    const rawData = await fetch("./font-list.json")
    const data = await rawData.json()
    return data["items"]
}


function getFontURL(fontList, idx, variant) {
    const url = fontList[idx].files[variant]
    return url.replace(/^http:/, "https:")
}


async function getLicense(fontFile) {
    const buffer = await fontFile.arrayBuffer()
    const font = await opentype.parse(buffer)
    const license = font.tables.name.license || font.tables.name.licenseURL
    return license ? license.en : "License not found"
}


function readAsDataURL(blob) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => { resolve(reader.result) }
        reader.onerror = () => { reject(reader.error) }
        reader.readAsDataURL(blob)
    })
}


async function ttfToBase64IfLicenseAllows(fontURL) {
    $("#font-warning").empty()
    const font = await fetch(fontURL)
    const fontBlob = await font.blob()

    const licenseStatement = await getLicense(fontBlob)
    console.info(licenseStatement)
    const licensesAllowModification = [
        "SIL Open Font License, Version 1.1",
        "http://scripts.sil.org/OFL",
        "Apache License, Version 2.0",
    ]
    for (let name of licensesAllowModification) {
        if (licenseStatement.replace(/\s/g, " ").includes(name)) {
            const base64Font = await readAsDataURL(fontBlob)
            return `url("${base64Font}")`
        }
    }
    console.warn("The font cannot be converted to Base64, due to its license terms.")
    $("#font-warning").text("Font file cannot be embedded, so the logo may look different depending on environment.")
    return `url("${fontURL}") format("truetype")`
}


export { loadFontList, getFontURL, getLicense, ttfToBase64IfLicenseAllows }
