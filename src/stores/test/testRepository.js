import axios from 'axios';
import { SERVER } from 'config/config.json';

class testRepository {
  async getTest() {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.get(`${SERVER}/test`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new testRepository();