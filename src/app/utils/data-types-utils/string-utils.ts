export class StringUtils {
    public static isNullOrEmpty(val: string) : boolean {
        if (val === undefined ||
            val === null ||
            ((typeof val === 'string' || val instanceof String) && val.trim() === '')) {
            return true;
        }
        return false;
    };
}

