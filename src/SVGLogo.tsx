import { Dimension, Font, LogoProperty, RectangleCorners } from "./types";
import { getBase64Font, getFontURL } from "./fonts/fonts";


function Text(props: { text: string, size: Dimension, offset: Dimension }) {
    return (
        <text
            x={props.size.x * (50 + props.offset.x) / 100}
            y={props.size.y * (50 + props.offset.y) / 100}
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="url(#gradient)"
        >
            {props.text}
        </text>
    )
}


function getSquareCornersInPercent(
    angleDeg: number, center: number[] = [0, 0]
): RectangleCorners {
    const [centerX, centerY] = center;
    const angleRad = angleDeg * Math.PI / 180
    const x1 = Math.round(centerX + 50 + Math.sin(angleRad) * 50) + "%"
    const x2 = Math.round(centerX + 50 - Math.sin(angleRad) * 50) + "%"
    const y1 = Math.round(centerY + 50 + Math.cos(angleRad) * 50) + "%"
    const y2 = Math.round(centerY + 50 - Math.cos(angleRad) * 50) + "%"
    return { x1, y1, x2, y2 }
}


function SVGLogo(props: { property: LogoProperty }) {
    const { property } = props;

    function getFont(font: Font) {
        const url = getFontURL(font.familyIdx, font.variantIdx);
        return getBase64Font(url);
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${property.size.x} ${property.size.y}`}
            width="100%"
        >
            <defs>
                <linearGradient
                    id="gradient"
                    gradientUnits="userSpaceOnUse"
                    {...getSquareCornersInPercent(property.textColor.angle)}
                >
                    <stop
                        stopColor={property.textColor.color1}
                        offset={`${50 - property.textColor.width}%`}
                    />
                    <stop
                        stopColor={property.textColor.color2}
                        offset={`${50 + property.textColor.width}%`}
                    />
                </linearGradient>
                <linearGradient
                    id="bg-gradient"
                    gradientUnits="userSpaceOnUse"
                    {...getSquareCornersInPercent(property.bgColor.angle)}
                >
                    <stop
                        stopColor={property.bgColor.color1}
                        offset={`${50 - property.bgColor.width}%`}
                    />
                    <stop
                        stopColor={property.bgColor.color2}
                        offset={`${50 + property.bgColor.width}%`}
                    />
                </linearGradient>
            </defs>
            <style>
                {`@font-face {
                    font-family: "custom"
                    src: ${getFont(property.font)}
                }
                text {
                    font: ${property.font.size} "custom"
                }
                `}
            </style>
            <rect
                x={0}
                y={0}
                width="100%"
                height="100%"
                fill="url(#bg-gradient)"
                fillOpacity={property.bgOpacity / 100}
            />
            <Text
                text={property.text} size={property.size} offset={property.textOffset}
            />
        </svg>
    );
}


export { SVGLogo };
