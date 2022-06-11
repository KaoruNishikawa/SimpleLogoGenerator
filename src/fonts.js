"use strict"


/**
 * Format of font data, downloaded from Google Fonts.
 * @typedef FontData
 * @property {string} family - Name of the font family.
 * @property {Array.<string>} variants - Names of font variants.
 * @property {Array.<string>} subsets - The scripts the font supports.
 * @property {string} version - Version of the font family release.
 * @property {string} lastModified - Date the font family was modified for the last time.
 * @property {Object<string, string>} files - URL to font files for every variants.
 * @property {string} category - Kind of the font, e.g. serif font or san-serif one.
 * @property {string} kind - String "webfonts#webfont".
 * @see {@link https://developers.google.com/fonts/docs/developer_api#details}
 * @see {@link https://developers.google.com/fonts/docs/getting_started#specifying_script_subsets}
 * for subset handling.
 */
/**
 * Get Google font informations.
 * @returns {Promise.<Array.<FontData>>} Font data, such as file URL, category, etc.
 */
async function loadFontList() {
    const rawData = await fetch("./font-list.json")
    const data = await rawData.json()
    return data["items"]
}


/**
 * Get the URL to specified font file, forcing HTTPS protocol.
 * @param {Array.<FontData>} fontList - List of font information.
 * @param {int} idx - 0-based index of the font in ``fontList``.
 * @param {string} variant - Variant of the font.
 * @returns {string} - URL to the font file of ``fontList[idx][variants=variant]``.
 */
function getFontURL(fontList, idx, variant) {
    const url = fontList[idx].files[variant]
    return url.replace(/^http:/, "https:")
}


/**
 * Try getting license terms from .ttf file.
 * @param {Blob} fontFile - File of MIME type font/ttf.
 * @returns {Promise.<string>} Extracted license terms.
 */
async function getLicense(fontFile) {
    const buffer = await fontFile.arrayBuffer()
    const font = await opentype.parse(buffer)
    console.info(`Using '${font.tables.name.fullName.en}'`)
    const license = font.tables.name.license || font.tables.name.licenseURL
    return license ? license.en : "License not found for " + font.tables.name.fullName.en
}


/**
 * ``FileReader.readAsDataURL``, wrapped by ``Promise``. Read the contents of the file.
 * @param {Blob} blob - File object.
 * @returns {Promise.<string>} Contents of the file, as a base64 encoded string.
 */
function readAsDataURL(blob) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => { resolve(reader.result) }
        reader.onerror = () => { reject(reader.error) }
        reader.readAsDataURL(blob)
    })
}


/**
 * If the license allows, convert font file (.ttf) to base64 string, to embed in svg.
 * @param {string} fontURL - URL to the font file.
 * @returns {Promise.<string>} URL containing base64 data, in CSS format. If license 
 * doesn't allow file modification/redistribution, original URL is returned in the same
 * format.
 */
async function ttfToBase64IfLicenseAllows(fontURL) {
    $("#font-warning").empty()
    const font = await fetch(fontURL)
    const fontBlob = await font.blob()

    const licenseStatement = await getLicense(fontBlob)
    console.debug(licenseStatement)
    const licensesAllowModification = [
        // OFL
        "SIL OPEN FONT LICENSE Version 1.1",
        "Open Font License",
        "OFL v1.1",
        "http://scripts.sil.org/OFL",
        "https://scripts.sil.org/OFL",
        "http://scripts.sil.org/cms/scripts/page.php?item_id=OFL_web",
        // Apache License
        "Apache License, Version 2.0",
        // GPL
        "GNU General Public License",
    ]
    for (let name of licensesAllowModification) {
        if (licenseStatement.replace(/\s/g, " ").includes(name)) {
            const base64Font = await readAsDataURL(fontBlob)
            return `url("${base64Font}")`
        }
    }
    console.warn("The font cannot be converted to Base64, due to its license terms.")
    $("#messages").append($("<p>").text(
        "Font file cannot be embedded,\
        so the logo may look different depending on environment."
    ))
    return `url("${fontURL}") format("truetype")`
}


export { loadFontList, getFontURL, getLicense, ttfToBase64IfLicenseAllows }
