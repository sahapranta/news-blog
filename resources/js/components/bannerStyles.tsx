// bannerStyles.ts
export const bannerStyles = {
    blue: {
        wrapper: 'bg-gradient-to-r from-blue-600 to-violet-600 text-white',
        title: 'bg-white/20 text-sm font-semibold backdrop-blur-sm px-3 py-1 rounded-full inline-block',
        author: 'text-xl md:text-2xl font-bold mt-2',
        body: 'text-blue-100',
        source: 'text-blue-100 text-xs text-right mt-3',
        decorations: (
            <>
                <div className="absolute -top-16 -left-16 h-32 w-32 animate-pulse rounded-full bg-white opacity-70" />
                <div className="absolute top-5 right-10 h-12 w-12 rounded-full bg-white opacity-90" />
                <div className="absolute -right-8 -bottom-8 h-32 w-32 animate-pulse rounded-full bg-blue-300 opacity-60 delay-300" />
            </>
        ),
    },

    white: {
        wrapper: 'bg-white dark:bg-gray-900 border-3 border-indigo-200 border-r-purple-500/30 border-t-purple-500/40',
        title: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs px-2.5 py-0.5 rounded-full font-medium inline-block',
        author: 'text-2xl font-bold text-gray-900 dark:text-white mt-2',
        body: 'text-gray-600 dark:text-gray-300',
        source: 'text-gray-600 dark:text-gray-300 text-xs text-right mt-3',
        decorations: (
            <>
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-purple-500 opacity-50" />
                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-indigo-500 opacity-60" />
            </>
        ),
    },

    yellow: {
        wrapper: 'bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50',
        title: 'relative inline-block bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-semibold text-white rounded-full',
        author: 'text-2xl font-bold text-amber-900 mt-2',
        body: 'text-amber-700 font-medium max-w-lg',
        source: 'text-amber-700 text-xs text-right mt-3',
        decorations: (
            <>
                <div className="absolute -top-8 -left-8 h-32 w-32 animate-pulse rounded-full bg-amber-500" />
                <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-amber-600 blur-md" />
                <div className="absolute bottom-12 left-1/3 h-24 w-24 rounded-full bg-amber-400 blur-md" />
                <div className="absolute top-1/2 right-1/4 h-16 w-16 rounded-full bg-amber-600" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(251,191,36,0.8),transparent)]" />
            </>
        ),
    },

    red: {
        wrapper: 'bg-gradient-to-r from-red-600 to-rose-600',
        title: 'relative inline-block bg-gradient-to-r from-rose-400 to-rose-700 px-3 py-1.5 text-xs font-semibold text-white rounded-full',
        author: 'text-2xl font-bold text-white mt-2',
        body: 'text-gray-100 font-medium max-w-lg',
        source: 'text-gray-200 text-xs text-right mt-3',
        decorations: (
            <>
                <div className="absolute -top-16 -left-16 h-32 w-32 animate-pulse rounded-full bg-white opacity-80" />
                <div className="absolute top-5 right-10 h-12 w-12 rounded-full bg-white opacity-90" />
                <div className="absolute -right-8 -bottom-8 h-32 w-32 animate-pulse rounded-full bg-white opacity-80 delay-300" />
            </>
        ),
    },

    green: {
        wrapper: 'bg-gradient-to-r from-green-600 to-emerald-600',
        title: 'relative inline-block bg-gradient-to-r from-green-500 to-green-600 px-3 py-1.5 text-xs font-semibold text-white rounded-full',
        author: 'text-2xl font-bold text-green-900 text-white mt-2',
        body: 'font-medium max-w-lg text-gray-100',
        source: 'text-xs text-right mt-3 text-gray-200',
        decorations: (
            <>
                <div className="absolute -top-16 -left-16 h-32 w-32 animate-pulse rounded-full bg-white opacity-50" />
                <div className="absolute top-5 right-10 h-12 w-12 rounded-full bg-white opacity-80" />
                <div className="absolute -right-8 -bottom-8 h-32 w-32 animate-pulse rounded-full bg-blue-300 opacity-70 delay-300" />
            </>
        ),
    },
};
