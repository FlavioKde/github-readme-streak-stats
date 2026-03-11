export function sendSvgResponse({ res, status, svgString }) {
    if (!res.getHeader('Cache-Control')) {
        res.setHeader('Cache-Control', 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600');
    }
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(status).send(svgString);
    };
 