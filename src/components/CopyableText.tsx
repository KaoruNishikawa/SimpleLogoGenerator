import React from "react";

import "./CopyableText.scss";


function CopyableText(props: { text: string }): JSX.Element {
    const [copied, setCopied] = React.useState<boolean>(false);

    const doubleBoxPath = (
        <>
            <path
                d="M 3 0 H 12 Q 15 0, 15 3 V 12 Q 15 15, 12 15 H 3 Q 0 15, 0 12 V 3 Q 0 0, 3 0"
                fill="transparent"
                stroke="var(--color)"
                strokeWidth="2"
                transform="translate(6, 2)"
            />
            <path
                d="M 3 0 H 12 Q 15 0, 15 3 V 12 Q 15 15, 12 15 H 3 Q 0 15, 0 12 V 3 Q 0 0, 3 0"
                fill="var(--color)"
                stroke="var(--color)"
                strokeWidth="2"
                transform="translate(2, 6)"
            />
        </>
    )
    const checkMarkPath = (
        <>
            <path
                d="M 0 7 L 5 13 L 13 3"
                fill="transparent"
                stroke="var(--color)"
                strokeWidth="4"
                transform="translate(4, 4)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M 0 7 L 5 13 L 13 3"
                fill="transparent"
                stroke="#0F0"
                strokeWidth="2"
                transform="translate(4, 4)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    )

    return (
        <div className="copiable-text">
            < input type="text" value={props.text} disabled={true} />
            <button onClick={() => {
                navigator.clipboard.writeText(props.text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={"0 0 23 23"}
                    height="100%"
                >
                    {copied ? checkMarkPath : doubleBoxPath}
                </svg>
            </button>
        </div >
    )
}


export default CopyableText;
