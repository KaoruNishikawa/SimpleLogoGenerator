import React from "react";

import {
    ColorGradient,
    LogoDimension,
    LogoFont,
    LogoText,
    LogoTextOffset,
    Opacity
} from "./properties"
import { LogoProperty, LogoPropertySetter } from "../types";
import "./Palette.scss";


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
        <div style={{ margin: "1em" }} className="palette">
            <PaletteSection title="Foreground">
                <LogoText
                    text={props.property.text} setText={props.propertySetter.text}
                />
                <LogoDimension
                    size={props.property.size} setSize={props.propertySetter.size}
                />
                <LogoFont
                    font={props.property.font} setFont={props.propertySetter.font}
                />
                <ColorGradient
                    color={props.property.textColor}
                    setColor={props.propertySetter.textColor}
                />
                <LogoTextOffset
                    offset={props.property.textOffset}
                    setOffset={props.propertySetter.textOffset}
                />
            </PaletteSection>
            <PaletteSection title="Background">
                <ColorGradient
                    color={props.property.bgColor}
                    setColor={props.propertySetter.bgColor}
                />
                <Opacity
                    opacity={props.property.bgOpacity}
                    setOpacity={props.propertySetter.bgOpacity}
                />
            </PaletteSection>
        </div>
    );
}


export { Palette };
