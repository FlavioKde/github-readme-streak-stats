import { NotFoundError, ValidationError, ConfigurationError } from "../shared/errors/index.js";  

export function handleJsonError(res, error) {
    console.error('Stats endpoint error:', error);
    if (error instanceof NotFoundError) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(404).json({
            error: 'Not Found',
            message: error.message
        });
    }   
    if (error instanceof ValidationError) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(400).json({
            error: 'Bad Request',
            message: error.message
        });
    }
    if (error instanceof ConfigurationError) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(500).json({
            error: 'Configuration Error',
            message: error.message
        });
    }
    res.setHeader('Cache-Control', 'no-store');
    return res.status(500).json({
        error: 'Internal Server Error',
        message: error.message || "Unexpected error"
    }); 
}   