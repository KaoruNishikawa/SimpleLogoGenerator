"use strict"

import * as fonts from "./fonts.js"
import * as svg from "./svg.js"


async function main() {
    const fontList = await fonts.loadFontList()

    const $svgContainer = $("#svg-image")
    const $logoSizeX = $("#logo-size-X")
    const $logoSizeY = $("#logo-size-Y")
    const $fontFamilySelect = $("#font-family")
    const $fontVariantsSelect = $("#font-variants")
    const $logoTextInput = $("#logo-text")
    const $logoTextColor1 = $("#logo-text-color1")
    const $logoTextColor2 = $("#logo-text-color2")
    const $logoTextSize = $("#logo-text-size")
    const $logoGradAngle = $("#logo-grad-angle")
    const $logoGradWidth = $("#logo-grad-width")
    const $logoBgColor1 = $("#logo-bg-color1")
    const $logoBgColor2 = $("#logo-bg-color2")
    const $logoBgGradAngle = $("#logo-bg-grad-angle")
    const $logoBgGradWidth = $("#logo-bg-grad-width")
    const $logoBgOpacity = $("#logo-bg-opacity")
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
            textStyle: {
                color1: $logoTextColor1[0].value,
                color2: $logoTextColor2[0].value,
                gradWidth: parseInt($logoGradWidth[0].value),
                gradAngleDeg: $logoGradAngle[0].value,
                size: $logoTextSize[0].value + "pt",
                offset: [$logoTextOffsetX[0].value, $logoTextOffsetY[0].value]
                    .map(Math.round),
            },
            bgStyle: {
                color1: $logoBgColor1[0].value,
                color2: $logoBgColor2[0].value,
                gradWidth: parseInt($logoBgGradWidth[0].value),
                gradAngleDeg: $logoBgGradAngle[0].value,
                opacity: $logoBgOpacity[0].value,
            },
            size: [$logoSizeX[0].value, $logoSizeY[0].value].map(Math.round),
        })
        $svgContainer.empty().append(svgLogo)

        $download.off("click").click(() => svg.download(
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
            $("<option>").attr("value", variant).text(variant)
                .appendTo($fontVariantsSelect)
        }
        if (Object.keys(fontList[selected].variants).length === 1) {
            $fontVariantsSelect.attr("disabled", true)
        }
        updateSVG()
    }).change()
    $("#logo-options").change(updateSVG)

    $logoTextInput.focus()
}


$(document).ready(main)
