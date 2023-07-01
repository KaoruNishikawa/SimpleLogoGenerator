import React from "react";

import { Dimension } from "../../types";


function LogoDimension(
    props: { size: Dimension, setSize: (size: Dimension) => void }
): JSX.Element {
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
                <input
                    id="logo-size-x"
                    type="number"
                    value={props.size.x}
                    onChange={handleChangeX}
                />
                <span className="sep">&times;</span>
                <input
                    id="logo-size-y"
                    type="number"
                    value={props.size.y}
                    onChange={handleChangeY}
                />
                <span className="unit">px</span>
            </td>
        </tr>
    )
}


export default LogoDimension;
