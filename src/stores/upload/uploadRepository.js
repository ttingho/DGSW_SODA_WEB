import { SERVER } from 'config/config.json';
import axios from 'axios';

class uploadRepository {
  async uploadImage(imageForm) {
    try {
      const { data } = await axios.post(`${SERVER}/upload/image`, imageForm);
      
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new uploadRepository();
