import axios from 'axios';
import { SERVER } from 'config/config.json';

class bambooRepository {
  async getBambooFeed() {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.get(`${SERVER}/bamboo`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new bambooRepository();