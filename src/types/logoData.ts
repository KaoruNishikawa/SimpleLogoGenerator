import { Dimension } from "./geometry";
import { Font } from "./fonts";
import { Gradient } from "./colors";

interface LogoProperty {
    text: string;
    size: Dimension;
    font: Font;
    textColor: Gradient;
    textOffset: Dimension;
    bgColor: Gradient;
    bgOpacity: number;
}

interface LogoPropertySetter {
    text: (text: string) => void;
    size: (size: Dimension) => void;
    font: (font: Font) => void;
    textColor: (textColor: Gradient) => void;
    textOffset: (textOffset: Dimension) => void;
    bgColor: (bgColor: Gradient) => void;
    bgOpacity: (bgOpacity: number) => void;
}

export type { LogoProperty, LogoPropertySetter };
