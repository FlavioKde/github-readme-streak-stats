import { fetchUserContributions } from '../../lib/github/githubClient';
import { calculateStreak } from '../../lib/streak/calculateStreak';
import { NotFoundError, ValidationError, ConfigurationError  } from "../../lib/shared/errors/index.js";

export default async function handler(req, res) {
  try {
    const { user } = req.query;

    if (!user) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing required query parameter: user'
      });
    }
    const contributions = await fetchUserContributions({username: user});
    
    const stats = calculateStreak(contributions);
    
    res.status(200).json(stats);
    
  } catch (error) {
    console.error('Stats endpoint error:', error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        error: 'Not Found',
        message: error.message
      });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({
        error: 'Bad Request',
        message: error.message
      });
    }

     if (error instanceof ConfigurationError) {
      return res.status(500).json({
        error: 'Configuration Error',
        message: error.message
      });
    }
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }     
}