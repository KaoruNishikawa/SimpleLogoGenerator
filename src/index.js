"use strict"


import * as fonts from "./fonts.js"
import * as svg from "./svg.js"


async function main() {
    const fontList = await fonts.loadFontList()

    const $svgContainer = $("#svg-image")
    const $fontFamilySelect = $("#font-family")
    const $fontVariantsSelect = $("#font-variants")
    const $logoTextInput = $("#logo-text")
    const $logoTextColor1 = $("#logo-text-color1")
    const $logoTextColor2 = $("#logo-text-color2")
    const $logoTextSize = $("#logo-text-size")
    const $logoGradAngle = $("#logo-grad-angle")
    const $logoGradShrink = $("#logo-grad-shrink")
    const $logoBgColor1 = $("#logo-bg-color1")
    const $logoBgColor2 = $("#logo-bg-color2")
    const $logoBgGradAngle = $("#logo-bg-grad-angle")
    const $logoBgGradShrink = $("#logo-bg-grad-shrink")
    const $logoTextOffsetX = $("#logo-text-offset-x")
    const $logoTextOffsetY = $("#logo-text-offset-y")
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
            textSize: $logoTextSize[0].value + "pt",
            textColor: $logoTextColor1[0].value,
            textColor2: $logoTextColor2[0].value,
            bgColor1: $logoBgColor1[0].value,
            bgColor2: $logoBgColor2[0].value,
            gradAngleDeg: $logoGradAngle[0].value,
            gradShrink: $logoGradShrink[0].value,
            bgGradAngleDeg: $logoBgGradAngle[0].value,
            bgGradShrink: $logoBgGradShrink[0].value,
            textOffset: [$logoTextOffsetX[0].value, $logoTextOffsetY[0].value]
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
    $logoTextColor1.change(updateSVG)
    $logoTextColor2.change(updateSVG)
    $logoBgColor1.change(updateSVG)
    $logoBgColor2.change(updateSVG)
    $logoTextSize.change(updateSVG)
    $logoGradAngle.change(updateSVG)
    $logoGradShrink.change(updateSVG)
    $logoBgGradShrink.change(updateSVG)
    $logoBgGradAngle.change(updateSVG)
    $logoTextOffsetX.change(updateSVG)
    $logoTextOffsetY.change(updateSVG)
}


$(document).ready(main)
