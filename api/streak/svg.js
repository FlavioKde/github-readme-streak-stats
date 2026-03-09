import { fetchUserContributions } from '../../lib/github/githubClient.js';
//import { NotFoundError, ValidationError, ConfigurationError  } from "../../lib/shared/errors/index.js";
import { ValidationError } from "../../lib/shared/errors/ValidationError.js";
import { renderStreakSvg } from '../../lib/render/renderStreakSvg.js';
//import { errorSvg } from '../../lib/render/error_svg.js';
import { sendSvgResponse } from '../../lib/render/sendSvgResponse.js'; 
import { handleSvgError } from '../../lib/http/handleSvgError.js';
import { getCachedContributions } from '../../lib/cache/contributionsCache.js';

export default async function handler(req, res) {

     
  try {
    const { user } = req.query; 
    if (!user) {
        /*
        sendSvgResponse({
            res,
            status: 400,
            svgString: errorSvg({ errorType: "Bad Request", message: "Missing required query parameter: user" })
        });
        */
       throw new ValidationError("Missing required query parameter: user");
      //  return;
    }

    //const contributions = await getCachedContributions (fetchUserContributions({username: user}));
    const contributions = await getCachedContributions(fetchUserContributions, user);

    const streakData = renderStreakSvg(contributions);

        sendSvgResponse({
            res,
            status: 200,
            svgString: streakData
        });

  } catch (error) {


    handleSvgError(res, error);

    /*
    console.error('SVG endpoint error:', error);   

    if (error instanceof NotFoundError) {
        sendSvgResponse({
            res,
            status: 404,    
            svgString: errorSvg({ errorType: "Not Found", message: "Error 404" })
        });

        
        
        return;

    }   
    /*
    if (error instanceof ValidationError) {
        sendSvgResponse({
            res,
            status: 400,
            svgString: errorSvg({ errorType: "Bad Request", message: "Error 400" })
        });
    
       
        return;
    } 
    /*          
    if (error instanceof ConfigurationError) {
        sendSvgResponse({
            res,
            status: 500,
            svgString: errorSvg({ errorType: "Configuration Error", message: "Error 500" })
        });
   
        return;
    }

        /*
        sendSvgResponse({
            res,
            status: 500,
            svgString: errorSvg({ errorType: "Internal Server Error", message: "Error 500" })
        });

            */
      
  }

}
