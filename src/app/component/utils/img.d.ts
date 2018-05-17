import { CompressOptions } from "./compress-options";

export declare function compress(
    file: File,
    options: CompressOptions,
    callback: (file: string) => void,
    onError?: (file: File, error: Error) => void
): void;