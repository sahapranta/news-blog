export const fetchBreakingNewsFromApi = async (): Promise<{
    title: string, slug: string
}[]> => {
    const res = await fetch('/api/v1/news/breaking');
    if (!res.ok) throw new Error('Failed to fetch layout data');

    return await res.json();
};