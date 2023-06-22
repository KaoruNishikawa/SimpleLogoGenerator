import React from "react";

import { Palette } from "./Palette";
import { Preview } from "./Preview";
import { LogoProperty, LogoPropertySetter } from "../types";
import defaults from "../defaultProperties";


// TODO: parse URL query string
function Container() {
    const [text, setText] = React.useState(defaults.text);
    const [size, setSize] = React.useState(defaults.size);
    const [font, setFont] = React.useState(defaults.font);
    const [textColor, setTextColor] = React.useState(defaults.textColor);
    const [textOffset, setTextOffset] = React.useState(defaults.textOffset);
    const [bgColor, setBgColor] = React.useState(defaults.bgColor);
    const [bgOpacity, setBgOpacity] = React.useState(defaults.bgOpacity);

    const property: LogoProperty = {
        text: text,
        size: size,
        font: font,
        textColor: textColor,
        textOffset: textOffset,
        bgColor: bgColor,
        bgOpacity: bgOpacity,
    }

    const propertySetter: LogoPropertySetter = {
        text: setText,
        size: setSize,
        font: setFont,
        textColor: setTextColor,
        textOffset: setTextOffset,
        bgColor: setBgColor,
        bgOpacity: setBgOpacity,
    }

    return (
        <div className="flex">
            <Palette property={property} propertySetter={propertySetter} />
            <Preview property={property} />
        </div>
    );
}


export default Container;
