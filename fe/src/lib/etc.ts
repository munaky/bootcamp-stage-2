export const objectToQuery = (obj: object) => {
    return new URLSearchParams(obj as Record<string, string>).toString();
}