import axios from 'axios';
import { SERVER } from 'config/config.json';
import TokenVerification from 'lib/Token/TokenVerification';

class inquiryRepository {

  async requestInquiryWrite (request) {
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
  
  async requestInquiryAnswer (request) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.post(`${SERVER}/question/answer`,request, {
        headers: {
          'x-access-token' : token,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getInquiryDetail (idx) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.get(`${SERVER}/question/detail`, {
        headers: {
          'x-access-token' : token,
        },
        params: {
          idx,
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new inquiryRepository();