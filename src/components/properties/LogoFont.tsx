import React from "react";

import { Font } from "../../types";
import { fontList } from "../../features/fonts";


function LogoFont(
    props: { font: Font, setFont: (font: Font) => void }
): JSX.Element {
    const initVariants = fontList.find(f => f.family === props.font.family)?.variants || [];
    const [variant, setVariant] = React.useState<string[]>(initVariants);
    const [disabled, setDisabled] = React.useState<boolean>(initVariants.length <= 1);

    const [variantSelect, setVariantSelect] = React.useState<string>(props.font.variant);

    function handleChangeFamily(e: React.ChangeEvent<HTMLSelectElement>) {
        const newFamily = e.target.value;
        const newFamilyIdx = e.target.selectedIndex;
        const newVariants = fontList[newFamilyIdx].variants;
        setVariant(newVariants);
        setDisabled(newVariants.length <= 1);
        const defaultVariant = newVariants.includes('regular')
            ? 'regular'
            : newVariants[0];
        setVariantSelect(defaultVariant);
        props.setFont({ ...props.font, family: newFamily, variant: defaultVariant });
    }

    function handleChangeVariant(e: React.ChangeEvent<HTMLSelectElement>) {
        const newVariant = e.target.value;
        setVariantSelect(e.target.value);
        props.setFont({ ...props.font, variant: newVariant });
    }

    function handleChangeSize(e: React.ChangeEvent<HTMLInputElement>) {
        const newSize = parseInt(e.target.value);
        props.setFont({ ...props.font, size: newSize });
    }

    const fontFamily = fontList.map((font, idx) => (
        <option key={idx} value={font.family}>
            {font.family}
        </option>
    ));

    return (
        <>
            <tr>
                <td rowSpan={2}>Font</td>
                <td>
                    <select
                        id="font-family"
                        onChange={handleChangeFamily}
                        value={props.font.family}
                    >
                        {fontFamily}
                    </select>
                    <select
                        id="font-variants"
                        onChange={handleChangeVariant}
                        disabled={disabled}
                        value={variantSelect}
                    >
                        {variant.map((v, i) => <option key={i} value={v}>{v}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <input
                        id="logo-text-size"
                        type="number"
                        value={props.font.size}
                        onChange={handleChangeSize}
                    />
                    <span className="unit">px</span>
                </td>
            </tr>
        </>
    )
}


export default LogoFont;
