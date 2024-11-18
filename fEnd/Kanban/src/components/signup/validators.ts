export function validate(value: string, name: string): boolean {
    const errors: Record<string, string>[] = [];

    switch (name) {
        case "first-name":
        case "last-name":
            return validateName(value, name, errors);
        default:
            return false;
    }
}

function validateName(
    value: string,
    name: string,
    errors: Record<string, string>[]
) {
    errors.length = 0;
    if (!value.trim()) {
        errors.push({
            name: name,
            error: "Field is required",
        });
    }
    if (value.length < 2) {
        errors.push({
            name: name,
            error: "Value must be at least 2 characters long",
        });
    }

    return errors.length === 0;
}
