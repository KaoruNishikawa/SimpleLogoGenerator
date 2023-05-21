import React from "react";

import * as properties from "./properties";
import { LogoProperty, LogoPropertySetter } from "./types";


function PaletteSection(props: { title: string, children?: React.ReactNode }) {
    return (
        <div>
            <table>
                <caption>{props.title}</caption>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    );
}


function Palette(props: {
    property: LogoProperty,
    propertySetter: LogoPropertySetter,
    children?: React.ReactNode
}) {
    return (
        <div>
            <PaletteSection title="Foreground">
                <properties.LogoText
                    text={props.property.text} setText={props.propertySetter.text} />
                <properties.LogoSize
                    size={props.property.size} setSize={props.propertySetter.size} />
                <properties.LogoFont
                    font={props.property.font} setFont={props.propertySetter.font} />
                <properties.ColorGradient
                    color={props.property.textColor}
                    setColor={props.propertySetter.textColor} />
                <properties.LogoTextOffset
                    offset={props.property.textOffset}
                    setOffset={props.propertySetter.textOffset} />
            </PaletteSection>
            <PaletteSection title="Background">
                <properties.ColorGradient
                    color={props.property.bgColor}
                    setColor={props.propertySetter.bgColor} />
                <properties.Opacity
                    opacity={props.property.bgOpacity}
                    setOpacity={props.propertySetter.bgOpacity} />
            </PaletteSection>
        </div>
    );
}


export { Palette };
