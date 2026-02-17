import { fetchUserContributions } from '../../lib/github/githubClient';
import { calculateStreak } from '../../lib/streak/calculateStreak';


export default async function handler(req, res) {
  try {
    const { user, theme = 'default', mode = 'daily' } = req.query;
    
    const data = await fetchUserContributions(user);
    const contributions = calculateStreak(data.contributions);
    res.status(200).json(contributions);
    
  } catch (error) {
    console.error('Stats endpoint error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }     
}