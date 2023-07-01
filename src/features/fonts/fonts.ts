import { items } from "../../assets/font-list.json"
import { FontFile, FontList } from "../../types";
import { modificationAllowed, licensesWhichAllowModification } from "./license";
import { readAsDataURL } from "../../lib/file";

const fontList = items as FontList;

function getFontURL(familyIdx: number, variantIdx: number): string {
    const family = fontList[familyIdx];
    const variant = family.variants[variantIdx];
    const url = family.files[variant] as string;
    return url.replace(/^http:/, "https:");
}

async function getBase64Font(url: string): Promise<FontFile> {
    const font = await fetch(url);
    const fontBlob = await font.blob();

    const modifiable = await modificationAllowed(fontBlob);
    if (!modifiable) {
        console.warn("The font cannot be converted to Base64, due to its license terms.");
        return { url, base64: null };
    }
    const base64Font = await readAsDataURL(fontBlob);
    return { url, base64: `url(${base64Font})` };
}


export { fontList, getBase64Font, getFontURL };
