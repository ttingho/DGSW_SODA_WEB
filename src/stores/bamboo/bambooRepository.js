import axios from 'axios';
import { SERVER } from 'config/config.json';

class bambooRepository {
  async getBambooFeed(page, limit) {
    
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.get(`${SERVER}/bamboo/`, {
        params: {
          page: page,
          limit: limit,
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new bambooRepository();