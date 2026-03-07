import { fetchUserContributions } from '../../lib/github/githubClient.js';
import { NotFoundError, ValidationError, ConfigurationError  } from "../../lib/shared/errors/index.js";
import { renderStreakSvg } from '../../lib/render/renderStreakSvg.js';
import { errorSvg } from '../../lib/render/error_svg.js';
import { sendSvgResponse } from '../../lib/render/sendSvgResponse.js'; 


export default async function handler(req, res) {

     
  try {
    const { user } = req.query; 
    if (!user) {

        sendSvgResponse({
            res,
            status: 400,
            svgString: errorSvg({ errorType: "Bad Request", message: "Missing required query parameter: user" })
        });
        return;
    }

    const contributions = await fetchUserContributions({username: user});

    const streakData = renderStreakSvg(contributions);

        sendSvgResponse({
            res,
            status: 200,
            svgString: streakData
        });

  } catch (error) {
    console.error('SVG endpoint error:', error);   

    if (error instanceof NotFoundError) {
        sendSvgResponse({
            res,
            status: 404,    
            svgString: errorSvg({ errorType: "Not Found", message: error.message })
        });
        return;

    }   
    if (error instanceof ValidationError) {
        sendSvgResponse({
            res,
            status: 400,
            svgString: errorSvg({ errorType: "Bad Request", message: error.message })
        });
        return;
    }           
    if (error instanceof ConfigurationError) {
        sendSvgResponse({
            res,
            status: 500,
            svgString: errorSvg({ errorType: "Configuration Error", message: error.message })
        });
        return;
    }
        sendSvgResponse({
            res,
            status: 500,
            svgString: errorSvg({ errorType: "Internal Server Error", message: error.message })
        });
  }

}
