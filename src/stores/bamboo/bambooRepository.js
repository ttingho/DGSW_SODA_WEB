import axios from 'axios';
import { SERVER } from 'config/config.json';
import TokenVerification from 'lib/Token/TokenVerification';

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

  async getBambooComment (page, limit, bambooIdx) {
    try {
      const { data } = await axios.get(`${SERVER}/bamboo/comment?page=${page}&limit=${limit}&bambooIdx=${bambooIdx}`);
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async postBambooComment (request) {

    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');
    try {
      const { data } = await axios.post(`${SERVER}/bamboo/comment`, request, {
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

export default new bambooRepository();
