export const BYTES_BASED_VALUES = ['jsHeapUsedSize', 'jsHeapTotalSize'];

export const DEFAULT_REPEAT_TIMES = 5;

export const DEFAULT_VIEWPORT_SIZE = {
    HEIGHT: '1080',
    WIDTH: '1920',
};

export const DEFAULT_OUTPUT_FORMAT = {
    CLI: 'table',
    DEFAULT: 'raw',
};

export const OUTPUT_FORMATS = ['raw', 'json', 'table', 'csv'];

export const RELEVANT_STATS = ['average', 'median', 'min', 'max', 'standardDeviation'];

export const URL_REGEX = /([a-z]{1,2}tps?):\/\/((?:(?!(?:\/|#|\?|&)).)+)(?:(\/(?:(?:(?:(?!(?:#|\?|&)).)+\/))?))?(?:((?:(?!(?:\.|$|\?|#)).)+))?(?:(\.(?:(?!(?:\?|$|#)).)+))?(?:(\?(?:(?!(?:$|#)).)+))?(?:(#.+))?/g;
