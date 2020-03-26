import axios from 'axios';
import { SERVER } from 'config/config.json';

class signRepository {
  
  async handleSignIn (request) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.post(`${SERVER}/auth/login`, request);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async handleSignUp (request) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.post(`${SERVER}/auth/register`, request);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new signRepository();
