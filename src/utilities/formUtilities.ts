// Utility function for generating initial values for forms
export function getInitialValues<T>(template: T): { [K in keyof T]: T[K] extends string ? string : T[K] extends number ? number : T[K] extends boolean ? boolean : null } {
    const initialValues: any = {};

    for (const key in template) {
        if (typeof template[key] === "string") {
            initialValues[key] = "";
        } else if (typeof template[key] === "number") {
            initialValues[key] = 0;
        } else if (typeof template[key] === "boolean") {
            initialValues[key] = false;
        } else {
            initialValues[key] = null; // Default for unsupported types
        }
    }

    return initialValues as { [K in keyof T]: T[K] extends string ? string : T[K] extends number ? number : T[K] extends boolean ? boolean : null };
}