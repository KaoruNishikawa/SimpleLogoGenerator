import React from "react";

import "./DownloadSVG.scss";


function DownloadSVG(props: {
    fileName: string, formats?: string[], nodeRef: React.RefObject<SVGSVGElement>
}) {
    async function download(format: string): Promise<void> {
        const $svgElement = props.nodeRef.current;
        if (!$svgElement) {
            throw new Error(`No SVG element found.`);
        }

        const data = new XMLSerializer().serializeToString($svgElement);
        const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });

        if (format === "svg") {
            const data = await svgBlob.text();
            const url = `data:<?xml version="1.0" standalone="no"?>\r\n${svgBlob.type},`
                + `${encodeURIComponent(data)}`;
            const $link = document.createElement("a");
            $link.download = `${props.fileName}-logo.svg`;
            $link.href = url;
            $link.click();
            $link.remove();
        } else {
            const url = URL.createObjectURL(svgBlob);
            const img = new Image();
            img.addEventListener("load", () => {
                const bbox = $svgElement.getBBox();
                const $canvas = document.createElement("canvas");
                $canvas.width = bbox.width;
                $canvas.height = bbox.height;
                const ctx = $canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, bbox.width, bbox.height);
                URL.revokeObjectURL(url);

                const $link = document.createElement("a");
                $link.download = `${props.fileName}-logo.${format}`;
                $link.href = $canvas.toDataURL(`image/${format}`);
                $link.click();
                $link.remove();
            })
            img.src = url;
        }
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const format = formData.get("file-format");
        await download(format as string);
    }

    return (
        <form onSubmit={handleSubmit} className="svg-save-form">
            <select name="file-format">
                {(props.formats || []).map(
                    (format) => <option key={format}>{format}</option>
                )}
            </select>
            <input type="submit" value="Save" />
        </form >
    )
}


export default DownloadSVG;
