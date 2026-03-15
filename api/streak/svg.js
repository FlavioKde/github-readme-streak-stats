import { fetchUserContributions } from '../../lib/github/githubClient.js';
import { ValidationError } from "../../lib/shared/errors/ValidationError.js";
import { renderStreakSvg } from '../../lib/render/renderStreakSvg.js';
import { sendSvgResponse } from '../../lib/render/sendSvgResponse.js'; 
import { handleSvgError } from '../../lib/http/handleSvgError.js';
import { getCachedContributions } from '../../lib/cache/contributionsCache.js';
import { getTheme } from '../../lib/themes/themes.js';

export default async function handler(req, res) {

     
  try {
    const { user, theme = "dark" } = req.query; 
    if (!user) {
        
       throw new ValidationError("Missing required query parameter: user");
      
    }
    const selectedTheme = getTheme(theme) || getTheme("dark");

    const contributions = await getCachedContributions(fetchUserContributions, user);

    const streakData = renderStreakSvg(contributions, selectedTheme);

        sendSvgResponse({
            res,
            status: 200,
            svgString: streakData
        });

  } catch (error) {


    handleSvgError(res, error, selectedTheme);
      
  }

}
