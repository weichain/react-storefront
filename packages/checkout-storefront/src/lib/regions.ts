export const locales = ["en-US", "pl-PL"] as const;

export const DEFAULT_LOCALE = "en-US";

export const DEFAULT_CHANNEL = "channel-th";

export type Locale = typeof locales[number];
