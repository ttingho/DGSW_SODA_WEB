import axios from 'axios';
import { SERVER } from 'config/config.json';
import TokenVerification from 'lib/Token/TokenVerification';

class questionRepository {

  async postQuestionWrite (request) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.post(`${SERVER}/question`, request, {
        headers: {
          'x-access-token' : token,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new questionRepository();