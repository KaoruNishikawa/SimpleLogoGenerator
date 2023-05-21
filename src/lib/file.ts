/**
 * Wrapper for `FileReader.readAsDataURL`.
 * @param blob - File to read
 * @returns Base64-encoded file
 */
function readAsDataURL(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => { resolve(reader.result as string); }
        reader.onerror = () => { reject(reader.error); }
        reader.readAsDataURL(blob);
    });
}


export { readAsDataURL };
