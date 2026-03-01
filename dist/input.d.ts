/**
 * Parse action input into a some proper thing.
 */
export interface Input {
    command: string;
    toolchain?: string;
    args: string[];
    workingDirectory?: string;
    tool?: string;
    cacheKey?: string;
}
export declare function get(): Input;
