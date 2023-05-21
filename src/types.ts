type FontList = Array<FontProperty>;

/**
 * NOTE: `files` keys are the same as `variants` values, and `files` values never be
 * undefined.
 */
interface FontProperty {
    "family": string,
    "variants": Array<string>,
    "subsets": Array<string>,
    "version": string,
    "lastModified": string,
    "files": { [key: string]: string },
    "category": string,
    "kind": string,
    "menu": string
}

interface RectangleCorners {
    x1: number | string;
    x2: number | string;
    y1: number | string;
    y2: number | string;
}

interface FontFile {
    url: string;
    base64: string | null;
}

interface Gradient {
    color1: string;
    color2: string;
    angle: number;
    width: number;
}

interface Dimension {
    x: number;
    y: number;
}

interface Font {
    familyIdx: number;
    variantIdx: number;
    size: number;
}

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


export type {
    Dimension,
    Font,
    FontFile,
    FontList,
    Gradient,
    LogoProperty,
    LogoPropertySetter,
    RectangleCorners
};
