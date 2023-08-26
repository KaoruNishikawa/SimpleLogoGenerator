import React from "react";

import { LogoProperty } from "../types";
import { SVGLogo } from "./SVGLogo";
import { DownloadSVG } from ".";
import CopyableText from "./CopyableText";
import { URLParameter } from "../features/url";
import "./Preview.scss";


const supportedFileFormats = [
    "svg",
    "png",
    "jpg",
]

function Preview(props: { property: LogoProperty }) {
    const currentPropURL = new URLParameter();
    currentPropURL.set("text", props.property.text);
    currentPropURL.set("size", props.property.size);
    currentPropURL.set("font", props.property.font);
    currentPropURL.set("textColor", props.property.textColor);
    currentPropURL.set("textOffset", props.property.textOffset);
    currentPropURL.set("bgColor", props.property.bgColor);
    const search = currentPropURL.set("bgOpacity", props.property.bgOpacity)

    // Not null, to prevent #messages flashing
    const [fontURL, setFontURL] = React.useState<string | null>("");
    const svgElement = React.useRef<SVGSVGElement>(null);

    return (
        <div className="preview">
            <div id="svg-image">
                <SVGLogo
                    property={props.property}
                    fontURL={fontURL}
                    setFontURL={setFontURL}
                    id="svg-logo"
                    svgElementRef={svgElement}
                />
            </div>
            <DownloadSVG
                fileName={props.property.text}
                formats={supportedFileFormats}
                nodeRef={svgElement}
            />
            <div id="messages">
                <span>
                    {
                        fontURL === null
                            ? "This font cannot be embedded due to its license terms."
                            : ""
                    }
                </span>
            </div>
            <CopyableText text={`${document.location.href.split("?")[0]}?${search}`} />
        </div>
    );
}


export { Preview }
