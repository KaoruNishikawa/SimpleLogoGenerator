import React from "react";

import "./RangeInput.scss";


function RangeInput(
    props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
): JSX.Element {
    return (
        <input type="range" className="range-input" {...props} />
    )
}


export default RangeInput;
