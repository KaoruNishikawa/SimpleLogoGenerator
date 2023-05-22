import React from "react";

import { Input } from "./Input";
import { SideWise } from "./Arrange";
import { Dimension, Font, Gradient, LogoProperty } from "./types";
import { fontList } from "./fonts/fonts";


const defaultProperty: LogoProperty = {
    text: "logo",
    size: { x: 80, y: 80 },
    font: { familyIdx: 0, variantIdx: 0, size: 20 },
    textColor: { color1: "#FF5599", color2: "#55FFFF", angle: 45, width: 35 },
    textOffset: { x: 0, y: 0 },
    bgColor: { color1: "#003344", color2: "#005533", angle: 45, width: 50 },
    bgOpacity: 100,
}


function LogoText(props: { text: string, setText: (text: string) => void }) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setText(e.target.value);
    }

    return (
        <tr>
            <td>Text</td>
            <td>
                <Input id="logo-text" value={props.text} onChange={handleChange} />
            </td>
        </tr>
    )
}


function LogoSize(props: { size: Dimension, setSize: (size: Dimension) => void }) {
    function handleChangeX(e: React.ChangeEvent<HTMLInputElement>) {
        const newX = parseInt(e.target.value);
        props.setSize({ ...props.size, x: newX });
    }

    function handleChangeY(e: React.ChangeEvent<HTMLInputElement>) {
        const newY = parseInt(e.target.value);
        props.setSize({ ...props.size, y: newY });
    }

    return (
        <tr>
            <td>Logo Size</td>
            <td>
                <SideWise sep="&times;">
                    <Input
                        id="logo-size-x"
                        type="number"
                        value={props.size.x}
                        className="short-input"
                        onChange={handleChangeX}
                    />
                    <Input
                        id="logo-size-y"
                        type="number"
                        value={props.size.y}
                        className="short-input"
                        onChange={handleChangeY}
                        unit="px"
                    />
                </SideWise>
            </td>
        </tr>
    )
}


function LogoFont(props: { font: Font, setFont: (font: Font) => void }) {
    const initVariants = fontList[0].variants;
    const [variant, setVariant] = React.useState<string[]>(initVariants);
    const [disabled, setDisabled] = React.useState<boolean>(initVariants.length === 0);

    const [variantSelect, setVariantSelect] = React.useState<string>(initVariants[0]);

    function handleChangeFamily(e: React.ChangeEvent<HTMLSelectElement>) {
        const newFamilyIdx = parseInt(e.target.value);
        const newVariants = fontList[newFamilyIdx].variants;
        setVariant(newVariants);
        setDisabled(newVariants.length <= 1);
        setVariantSelect(newVariants[0]);
        props.setFont({ ...props.font, familyIdx: newFamilyIdx, variantIdx: 0 });
    }

    function handleChangeVariant(e: React.ChangeEvent<HTMLSelectElement>) {
        const newVariantIdx = e.target.selectedIndex;
        setVariantSelect(e.target.value);
        props.setFont({ ...props.font, variantIdx: newVariantIdx });
    }

    function handleChangeSize(e: React.ChangeEvent<HTMLInputElement>) {
        const newSize = parseInt(e.target.value);
        props.setFont({ ...props.font, size: newSize });
    }

    const fontFamily = fontList.map((font, idx) => (
        <option key={idx} value={idx}>{font.family}</option>
    ));

    return (
        <>
            <tr>
                <td rowSpan={2}>Font</td>
                <td>
                    <select
                        id="font-family"
                        onChange={handleChangeFamily}
                    >
                        {fontFamily}
                    </select>
                    <select
                        id="font-variants"
                        onChange={handleChangeVariant}
                        disabled={disabled}
                        value={variantSelect}
                    >
                        {variant.map((v, i) => <option key={i}>{v}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <Input
                        id="logo-text-size"
                        type="number"
                        className="short-input"
                        value={props.font.size}
                        onChange={handleChangeSize}
                        unit="pt"
                    />
                </td>
            </tr>
        </>
    )
}


function ColorGradient(props: { color: Gradient, setColor: (color: Gradient) => void }) {
    function handleChangeColor1(e: React.ChangeEvent<HTMLInputElement>) {
        props.setColor({ ...props.color, color1: e.target.value });
    }

    function handleChangeColor2(e: React.ChangeEvent<HTMLInputElement>) {
        props.setColor({ ...props.color, color2: e.target.value });
    }

    function handleChangeAngle(e: React.ChangeEvent<HTMLInputElement>) {
        props.setColor({ ...props.color, angle: parseInt(e.target.value) });
    }

    function handleChangeWidth(e: React.ChangeEvent<HTMLInputElement>) {
        props.setColor({ ...props.color, width: parseInt(e.target.value) });
    }

    return (
        <>
            <tr>
                <td rowSpan={3}>Color Gradient</td>
                <td>
                    <SideWise sep="&rarr;">
                        <Input
                            id="logo-text-color1"
                            type="color"
                            value={props.color.color1}
                            onChange={handleChangeColor1}
                        />
                        <Input
                            id="logo-text-color2"
                            type="color"
                            value={props.color.color2}
                            onChange={handleChangeColor2}
                        />
                    </SideWise>
                </td>
            </tr>
            <tr>
                <td>
                    <SideWise>
                        <span>angle=</span>
                        <Input
                            id="logo-grad-angle"
                            type="number"
                            className="short-input"
                            value={props.color.angle}
                            onChange={handleChangeAngle}
                            unit="deg"
                        />
                    </SideWise>
                </td>
            </tr>
            <tr>
                <td>
                    <SideWise>
                        <span>width</span>
                        <Input
                            id="logo-grad-width"
                            type="range"
                            min="0"
                            max="50"
                            value={props.color.width}
                            onChange={handleChangeWidth}
                        />
                    </SideWise>
                </td>
            </tr>
        </>
    )
}


function LogoTextOffset(props: { offset: Dimension, setOffset: (color: Dimension) => void }) {
    function handleChangeX(e: React.ChangeEvent<HTMLInputElement>) {
        const newX = parseInt(e.target.value);
        props.setOffset({ ...props.offset, x: newX });
    }

    function handleChangeY(e: React.ChangeEvent<HTMLInputElement>) {
        const newY = parseInt(e.target.value);
        props.setOffset({ ...props.offset, y: newY });
    }

    return (
        <tr>
            <td>Text Offset</td>
            <td>
                <SideWise sep="&times;">
                    <Input
                        id="logo-text-offset-x"
                        type="number"
                        value={props.offset.x}
                        className="short-input"
                        onChange={handleChangeX}
                    />
                    <Input
                        id="logo-text-offset-y"
                        type="number"
                        value={props.offset.y}
                        className="short-input"
                        onChange={handleChangeY}
                        unit="%"
                    />
                </SideWise>
            </td>
        </tr>
    )
}


function Opacity(props: { opacity: number, setOpacity: (opacity: number) => void }) {
    function handleChangeOpacity(e: React.ChangeEvent<HTMLInputElement>) {
        const newOpacity = parseInt(e.target.value);
        props.setOpacity(newOpacity);
    }

    return (
        <tr>
            <td>Opacity</td>
            <td>
                <Input
                    id="logo-opacity"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={props.opacity}
                    onChange={handleChangeOpacity}
                />
            </td>
        </tr>
    )
}


export {
    ColorGradient,
    LogoFont,
    LogoSize,
    LogoText,
    LogoTextOffset,
    Opacity,
    defaultProperty
}
