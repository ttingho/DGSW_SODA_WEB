import axios from 'axios';
import { SERVER } from 'config/config.json';
import TokenVerification from 'lib/Token/TokenVerification';

class memberRepository {
  async getMyInfo() {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.get(`${SERVER}/member/my`, {
        headers: { 
          'x-access-token': token
        }
      });
      return data;
    } catch (error) {
      throw(error);
    }
  }

  async modifyMemberInfo (request) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.put(`${SERVER}/member`, request, {
        headers: {
          'x-access-token' : token,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async checkMemberPw (request) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.post(`${SERVER}/member/pw_check`, request, {
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

export default new memberRepository();