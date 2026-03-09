export function sendSvgResponse({ res, status, svgString }) {
    if (!res.getHeader('Cache-Control')) {
        res.setHeader('Cache-Control', 'public, max-age=43200');
    }
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(status).send(svgString);
    };
 