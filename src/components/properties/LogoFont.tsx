import React from "react";

import { Font } from "../../types";
import { fontList } from "../../features/fonts";


function LogoFont(
    props: { font: Font, setFont: (font: Font) => void }
): JSX.Element {
    const initVariants = fontList[0].variants;
    const [variant, setVariant] = React.useState<string[]>(initVariants);
    const [disabled, setDisabled] = React.useState<boolean>(initVariants.length <= 1);

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
        <option key={idx} value={idx} selected={props.font.familyIdx === idx}>
            {font.family}
        </option>
    ));

    return (
        <>
            <tr>
                <td rowSpan={2}>Font</td>
                <td>
                    <select id="font-family" onChange={handleChangeFamily}>
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
