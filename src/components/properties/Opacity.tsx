import React from "react";

import RangeInput from "../RangeInput";


function Opacity(
    props: { opacity: number, setOpacity: (opacity: number) => void }
): JSX.Element {
    function handleChangeOpacity(e: React.ChangeEvent<HTMLInputElement>) {
        const newOpacity = parseInt(e.target.value);
        props.setOpacity(newOpacity);
    }

    return (
        <tr>
            <td>Opacity</td>
            <td>
                <RangeInput
                    id="logo-opacity"
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


export default Opacity;
