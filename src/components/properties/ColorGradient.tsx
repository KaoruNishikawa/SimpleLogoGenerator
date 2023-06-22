import React from "react";

import { Gradient } from "../../types";
import AngleInput from "../AngleInput";
import RangeInput from "../RangeInput";


function ColorGradient(
    props: { color: Gradient, setColor: (color: Gradient) => void }
): JSX.Element {
    function handleChangeColor1(e: React.ChangeEvent<HTMLInputElement>): void {
        props.setColor({ ...props.color, color1: e.target.value });
    }

    function handleChangeColor2(e: React.ChangeEvent<HTMLInputElement>): void {
        props.setColor({ ...props.color, color2: e.target.value });
    }

    function handleChangeAngle(value: number): void {
        props.setColor({ ...props.color, angle: value });
    }

    function handleChangeWidth(e: React.ChangeEvent<HTMLInputElement>): void {
        props.setColor({ ...props.color, width: parseInt(e.target.value) });
    }

    return (
        <>
            <tr>
                <td rowSpan={3}>Color Gradient</td>
                <td>
                    <input
                        id="logo-text-color1"
                        type="color"
                        value={props.color.color1}
                        onChange={handleChangeColor1}
                    />
                    <span className="sep">&rarr;</span>
                    <input
                        id="logo-text-color2"
                        type="color"
                        value={props.color.color2}
                        onChange={handleChangeColor2}
                    />
                </td>
            </tr>
            <tr>
                <td>
                    <AngleInput
                        id="logo-grad-angle"
                        value={props.color.angle}
                        setValue={handleChangeAngle}
                    />
                </td>
            </tr>
            <tr>
                <td>
                    <span className="left-term">width</span>
                    <RangeInput
                        min="0"
                        max="100"
                        value={props.color.width}
                        onChange={handleChangeWidth}
                    />
                </td>
            </tr>
        </>
    )
}


export default ColorGradient;
