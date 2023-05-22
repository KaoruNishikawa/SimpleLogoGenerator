import React from "react";


function DownloadableSVG(props: {
    fileName: string, children: React.ReactNode, options?: string[], nodeId: string
}) {
    if (React.Children.count(props.children) !== 1) {
        throw new Error("Downloadable component must have exactly one child");
    }

    async function download(format: string): Promise<void> {
        const $svgElement = document.getElementById(
            props.nodeId
        ) as any as SVGGraphicsElement;
        if (!$svgElement) {
            throw new Error(`No element with id '${props.nodeId}'`);
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
                const bbox = ($svgElement as SVGGraphicsElement).getBBox();
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
        <>
            {props.children}
            <form onSubmit={handleSubmit}>
                <select name="file-format">
                    {(props.options || []).map(
                        (format) => <option key={format}>{format}</option>
                    )}
                </select>
                <input type="submit" value="Save" />
            </form>
        </>
    )
}


export { DownloadableSVG };
