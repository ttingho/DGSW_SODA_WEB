import axios from 'axios';
import { SERVER } from 'config/config.json';
import TokenVerification from 'lib/Token/TokenVerification';

class adminRepository {
  async getPendingList() {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.get(`${SERVER}/admin`, {
        headers: {
          'x-access-token': token
        }
      });
      
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new adminRepository();
