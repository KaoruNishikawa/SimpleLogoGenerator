/**
 * NOTE: `files` keys are the same as `variants` values, and `files` values never be
 * undefined.
 */
interface FontProperty {
    "family": string,
    "variants": Array<string>,
    "subsets": Array<string>,
    "version": string,
    "lastModified": string,
    "files": { [key: string]: string },
    "category": string,
    "kind": string,
    "menu": string
}

type FontList = Array<FontProperty>;

interface Font {
    familyIdx: number;
    variantIdx: number;
    size: number;
}

interface FontFile {
    url: string;
    base64: string | null;
}

export type { Font, FontFile, FontList };

