import { LogoProperty, LogoPropertySetter } from "./types";
import { SVGLogo } from "./SVGLogo";
// import { SaveButton } from "./SaveButton";
import { Downloadable } from "./Downloadable";


const supportedFileFormats = [
    "svg",
    "png",
    "jpg",
]

function Preview(props: { property: LogoProperty }) {
    return (
        <div>
            <div id="svg-image">
                <Downloadable
                    fileName={props.property.text}
                    options={supportedFileFormats}
                    nodeType="svg"
                >
                    <SVGLogo property={props.property} />
                </Downloadable>
            </div>
            <div id="messages"></div>
            {/* <SaveButton svg={svgElement} /> */}
        </div>
    );
}


export { Preview }
