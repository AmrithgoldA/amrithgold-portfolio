/**
 * Resolves a filename to a local asset URL using Vite's import.meta.glob.
 * Replaces the Firebase Storage getMediaData utility.
 *
 * All images should be placed in src/assets/images/.
 * The function matches by filename (basename) regardless of subdirectory.
 */

// Eagerly import all image assets at build time
const imageModules = import.meta.glob<string>(
    '../assets/images/**/*.{png,jpg,jpeg,svg,gif,webp}',
    { eager: true, import: 'default' }
);

// Build a lookup map: filename -> resolved URL
const imageMap: Record<string, string> = {};
for (const [path, url] of Object.entries(imageModules)) {
    const filename = path.split('/').pop();
    if (filename) {
        imageMap[filename] = url;
    }
}

/**
 * Get a local image asset URL by filename.
 * Falls back to undefined if the file is not found (matches old getMediaData behavior).
 */
export function getLocalImage(filename: string): string | undefined {
    // Try exact match first
    if (imageMap[filename]) {
        return imageMap[filename];
    }

    // Try case-insensitive match
    const lowerName = filename.toLowerCase();
    for (const [key, url] of Object.entries(imageMap)) {
        if (key.toLowerCase() === lowerName) {
            return url;
        }
    }

    console.warn(`Local image not found: ${filename}`);
    return undefined;
}
