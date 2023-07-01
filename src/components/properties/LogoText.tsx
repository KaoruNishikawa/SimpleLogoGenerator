import React from "react";


function LogoText(
    props: { text: string, setText: (text: string) => void }
): JSX.Element {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setText(e.target.value);
    }

    return (
        <tr>
            <td>Text</td>
            <td>
                <input
                    type="text"
                    id="logo-text"
                    value={props.text}
                    onChange={handleChange}
                />
            </td>
        </tr>
    )
}


export default LogoText;
