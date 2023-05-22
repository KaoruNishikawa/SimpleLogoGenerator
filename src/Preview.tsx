import { LogoProperty, LogoPropertySetter } from "./types";
import { SVGLogo } from "./SVGLogo";
// import { SaveButton } from "./SaveButton";
import { DownloadableSVG } from "./DownloadableSVG";


const supportedFileFormats = [
    "svg",
    "png",
    "jpg",
]

function Preview(props: { property: LogoProperty }) {
    return (
        <div>
            <div id="svg-image">
                <DownloadableSVG
                    fileName={props.property.text}
                    options={supportedFileFormats}
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
