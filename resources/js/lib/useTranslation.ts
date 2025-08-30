import { type SharedData, type Translations } from '@/types';
import { usePage } from '@inertiajs/react'

const flatten = (obj: Translations, prefix = ''): Record<string, string> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === 'string') {
            acc[fullKey] = value
        } else if (typeof value === 'object' && value !== null) {
            Object.assign(acc, flatten(value, fullKey))
        }

        return acc
    }, {} as Record<string, string>)
}

const flattenedLocalesCache: Record<string, Record<string, string>> = {};

export const useTranslation = () => {
    const { localeData: { translations, lang } } = usePage<SharedData>().props;

    if (!flattenedLocalesCache[lang] && translations) {
        flattenedLocalesCache[lang] = flatten(translations as Translations);
    }

    const t = (key: string, fallback?: string): string => {
        return flattenedLocalesCache[lang]?.[key] ?? fallback ?? key.replace(/_/g, ' ')
    }

    return { t };
}

