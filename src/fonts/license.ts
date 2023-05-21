import opentype from 'opentype.js'


async function getLicense(fontFile: Blob): Promise<string | null> {
    const buffer = await fontFile.arrayBuffer();
    const font = await opentype.parse(buffer);
    console.info(`Using '${font.tables.name.fullName.en}'`);
    const license = font.tables.license || font.tables.name.licenseURL;
    return license ? license.en : null;
}

const licensesWhichAllowModification: Array<string> = [
    // OFL
    "SIL OPEN FONT LICENSE Version 1.1",
    "Open Font License",
    "OFL v1.1",
    "http://scripts.sil.org/OFL",
    "https://scripts.sil.org/OFL",
    "http://scripts.sil.org/cms/scripts/page.php?item_id=OFL_web",
    // Apache License
    "Apache License, Version 2.0",
    // GPL
    "GNU General Public License",
]

async function modificationAllowed(fontFile: Blob): Promise<boolean> {
    const license = await getLicense(fontFile);
    console.debug(`License: ${license}`);
    for (let stmt of licensesWhichAllowModification) {
        if (!license) { continue; }
        if (license.replace(/\s/, " ").includes(stmt)) {
            return true;
        }
    }
    return false;
}


export { modificationAllowed, licensesWhichAllowModification };
