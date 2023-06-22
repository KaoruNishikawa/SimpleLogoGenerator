import { LogoProperty, LogoPropertySetter } from "../types/types";
import { SVGLogo } from "./SVGLogo";
import { DownloadableSVG } from ".";
import "./Preview.scss";


const supportedFileFormats = [
    "svg",
    "png",
    "jpg",
]

function Preview(props: { property: LogoProperty }) {
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
            {/* <SaveButton svg={svgElement} /> */}
        </div>
    );
}


export { Preview }
