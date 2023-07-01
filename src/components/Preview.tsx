import { LogoProperty } from "../types";
import { SVGLogo } from "./SVGLogo";
import { DownloadableSVG } from ".";
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

    return (
        <div className="preview">
            <div id="svg-image">
                <DownloadableSVG
                    fileName={props.property.text}
                    formats={supportedFileFormats}
                    nodeId="svg-logo"
                >
                    <SVGLogo property={props.property} id="svg-logo" />
                </DownloadableSVG>
            </div>
            <div id="messages"></div>
            <CopyableText text={`${document.location.origin}?${search}`} />
        </div>
    );
}


export { Preview }
