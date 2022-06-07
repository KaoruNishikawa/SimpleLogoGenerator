"use strict"


import * as fonts from "./fonts.js"
import * as svg from "./svg.js"


async function main() {
    const fontList = await fonts.loadFontList()

    const $svgContainer = $("#svg-image")
    const $fontFamilySelect = $("#font-family")
    const $fontVariantsSelect = $("#font-variants")
    const $logoTextInput = $("#logo-text")
    const $logoTextColor = $("#logo-text-color")
    const $logoTextColor2 = $("#logo-text-color2")
    const $logoTextSize = $("#logo-text-size")
    const $logoBgColor = $("#logo-bg-color")
    const $download = $("#download")
    const $fileFormatSelect = $("#file-format")

    async function updateSVG() {
        const fontURL = fonts.getFontURL(
            fontList,
            $(":selected", "#font-family")[0].value,
            $(":selected", "#font-variants")[0].value
        )

        const svgLogo = await svg.generateSVG({
            text: $logoTextInput[0].value,
            fontURL: fontURL,
            fontSize: $logoTextSize[0].value + "pt",
            textColor: $logoTextColor[0].value,
            textColor2: $logoTextColor2[0].value,
            bgColor: $logoBgColor[0].value,
        })
        $svgContainer.empty().append(svgLogo)

        $download.click(() => svg.download(
            svgLogo, () => $(":selected", "#file-format")[0].value)
        )
    }

    for (let idx in fontList) {
        $("<option>").attr("value", idx).text(fontList[idx].family)
            .appendTo($fontFamilySelect)
    }
    for (let extension of ["svg", "png", "jpg"]) {
        $("<option>").attr("value", extension).text(extension)
            .appendTo($fileFormatSelect)
    }

    $fontFamilySelect.change(function () {
        const selected = $(":selected", this)[0].value
        $fontVariantsSelect.empty().attr("disabled", false)
        for (let variant of fontList[selected].variants) {
            $("<option>").attr("value", variant).text(variant).appendTo($fontVariantsSelect)
        }
        if (Object.keys(fontList[selected].variants).length === 1) {
            $fontVariantsSelect.attr("disabled", true)
        }
        updateSVG()
    }).change()
    $fontVariantsSelect.change(updateSVG)
    $logoTextInput.change(updateSVG)
    $logoTextColor.change(updateSVG)
    $logoTextColor2.change(updateSVG)
    $logoBgColor.change(updateSVG)
    $logoTextSize.change(updateSVG)
}


$(document).ready(main)
