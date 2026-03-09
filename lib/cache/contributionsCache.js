const cache = {}
const CACHE_DURATION = 60 * 60 * 1000; 

export async function getCachedContributions( fetchFunction,username) {
    const cachedData = cache[username];

    if (cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION)) {
        return cachedData.contributions;
    }

    const contributions = await fetchFunction({ username });
    cache[username] = {
        contributions,
        timestamp: Date.now()
    };
    return contributions;
}
