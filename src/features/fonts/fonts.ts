import { items } from "../../assets/font-list.json"
import { FontFile, FontList } from "../../types";
import { modificationAllowed, licensesWhichAllowModification } from "./license";
import { readAsDataURL } from "../../lib/file";

const fontList = items as FontList;

function getFontURL(family: string, variant: string): string {
    const familyInfo = fontList.find(f => f.family === family) || fontList[0];
    const url = familyInfo.files[variant] || Object.values(familyInfo.files)[0];
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
