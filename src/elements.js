"use strict"


class Elements {
    constructor() { }

    static get logoText() { return $("#logo-text")[0].value }

    static get logoSizeX() { return Math.round($("#logo-size-x")[0].value) }

    static get logoSizeY() { return Math.round($("#logo-size-y")[0].value) }

    static get selectedFontFamily() { return $(":selected", "#font-family")[0].value }

    static get selectedFontVariant() { return $(":selected", "#font-variants")[0].value }

    static get logoTextSize() { return $("#logo-text-size")[0].value + "pt" }

    static get logoTextColor1() { return $("#logo-text-color1")[0].value }

    static get logoTextColor2() { return $("#logo-text-color2")[0].value }

    static get logoGradAngle() { return $("#logo-grad-angle")[0].value }

    static get logoGradWidth() { return Math.round($("#logo-grad-width")[0].value) }

    static get logoTextOffsetX() { return Math.round($("#logo-text-offset-x")[0].value) }

    static get logoTextOffsetY() { return Math.round($("#logo-text-offset-y")[0].value) }

    static get logoBgColor1() { return $("#logo-bg-color1")[0].value }

    static get logoBgColor2() { return $("#logo-bg-color2")[0].value }

    static get logoBgGradAngle() { return $("#logo-bg-grad-angle")[0].value }

    static get logoBgGradWidth() { return Math.round($("#logo-bg-grad-width")[0].value) }

    static get logoBgOpacity() { return $("#logo-bg-opacity")[0].value + "%" }

    static get selectedFileFormat() { return $(":selected", "#file-format")[0].value }

}


export { Elements as elem }
