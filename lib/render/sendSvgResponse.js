export function sendSvgResponse({ res, status, svgString }) {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(status).send(svgString);
    };
 