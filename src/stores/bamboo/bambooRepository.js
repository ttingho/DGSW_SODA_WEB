import axios from 'axios';
import { SERVER } from 'config/config.json';

class bambooRepository {
  async getBambooFeed(page, limit) {
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

  async applyBambooPost (request) {
    try {
      const { data } = await axios.post(`${SERVER}/bamboo`, request);
      
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new bambooRepository();
