import { NotFoundError, ValidationError, ConfigurationError } from '../shared/errors/index.js';
import { errorSvg } from '../render/error_svg.js';
import { sendSvgResponse } from '../render/sendSvgResponse.js'; 



export function handleSvgError(res, error, theme) {
    console.error('SVG endpoint error:', error);    
    if (error instanceof NotFoundError) {
        res.setHeader('Cache-Control', 'no-store');
        sendSvgResponse({
            res,
            status: 404,    
            svgString: errorSvg({ errorType: "Not Found", message: error.message || "Unexpected error"}, theme)
        });
        return; 
    }   
    if (error instanceof ValidationError) {
        res.setHeader('Cache-Control', 'no-store');
        sendSvgResponse({
            res,
            status: 400,
            svgString: errorSvg({ errorType: "Bad Request", message: error.message || "Unexpected error" }, theme)
        });
        return;
    }
    if (error instanceof ConfigurationError) {
        res.setHeader('Cache-Control', 'no-store');
        sendSvgResponse({
            res,
            status: 500,    
            svgString: errorSvg({ errorType: "Configuration Error", message: error.message || "Unexpected error" }, theme)
        });
        return;
    }
    res.setHeader('Cache-Control', 'no-store');
    sendSvgResponse({
        res,
        status: 500,
        svgString: errorSvg({ errorType: "Internal Server Error", message: error.message || "Unexpected error" }, theme)
    }); 

}