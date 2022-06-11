"use strict"

import { elem } from "./elements.js"
import * as fonts from "./fonts.js"
import * as svg from "./svg.js"


async function main() {
    const fontList = await fonts.loadFontList()

    async function updateSVG() {
        const fontURL = fonts.getFontURL(
            fontList, elem.selectedFontFamily, elem.selectedFontVariant
        )

        $("#messages").empty()
            .append($("<p>").text("Generating...").addClass("generating"))
        const svgLogo = await svg.generateSVG({
            text: elem.logoText,
            fontURL: fontURL,
            textStyle: {
                color1: elem.logoTextColor1,
                color2: elem.logoTextColor2,
                gradWidth: elem.logoGradWidth,
                gradAngleDeg: elem.logoGradAngle,
                size: elem.logoTextSize,
                offset: [elem.logoTextOffsetX, elem.logoTextOffsetY]
            },
            bgStyle: {
                color1: elem.logoBgColor1,
                color2: elem.logoBgColor2,
                gradWidth: elem.logoBgGradWidth,
                gradAngleDeg: elem.logoBgGradAngle,
                opacity: elem.logoBgOpacity,
            },
            size: [elem.logoSizeX, elem.logoSizeY],
        })
        $(".generating").remove()
        $("#svg-image").empty().append(svgLogo)

        $("#download").off("click").click(() => svg.download(
            svgLogo, () => elem.selectedFileFormat)
        )
    }

    const $fontFamilySelect = $("#font-family")
    const $fontVariantsSelect = $("#font-variants")
    const $fileFormatSelect = $("#file-format")

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

    $("#logo-text").focus()
}


$(document).ready(main)
