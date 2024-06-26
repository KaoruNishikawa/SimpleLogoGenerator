import { LogoProperty } from "./types";
import { URLParameter } from "./features/url";
import { fontList } from "./features/fonts";


const initialFont = fontList[Math.floor(Math.random() * fontList.length)];
const initialVariant = initialFont.variants.includes("regular")
    ? "regular"
    : initialFont.variants[0];

const urlParams = new URLParameter();

const defaultProperty: LogoProperty = {
    text: urlParams.get("text", "logo"),
    size: urlParams.getJSON("size", { x: 80, y: 80 }),
    font: urlParams.getJSON("font", { size: 20, family: initialFont.family, variant: initialVariant}),
    textColor: urlParams.getJSON(
        "textColor", { color1: "#FF5599", color2: "#55FFFF", angle: 45, width: 35 }
    ),
    textOffset: urlParams.getJSON("textOffset", { x: 0, y: 0 }),
    bgColor: urlParams.getJSON(
        "bgColor", { color1: "#003344", color2: "#005533", angle: 45, width: 50 }
    ),
    bgOpacity: urlParams.getInt("bgOpacity", 100),
}


export default defaultProperty;
