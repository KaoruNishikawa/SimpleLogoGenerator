import React from "react";

import { Palette } from "./Palette";
import { Preview } from "./Preview";
import { LogoProperty, LogoPropertySetter } from "./types";


function Container(props: { defaults: LogoProperty }) {
    const [text, setText] = React.useState(props.defaults.text);
    const [size, setSize] = React.useState(props.defaults.size);
    const [font, setFont] = React.useState(props.defaults.font);
    const [textColor, setTextColor] = React.useState(props.defaults.textColor);
    const [textOffset, setTextOffset] = React.useState(props.defaults.textOffset);
    const [bgColor, setBgColor] = React.useState(props.defaults.bgColor);
    const [bgOpacity, setBgOpacity] = React.useState(props.defaults.bgOpacity);

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


export { Container };
