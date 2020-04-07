import axios from 'axios';
import { SERVER } from 'config/config.json';

class signRepository {
  
  async handleSignIn (request) {
    try {
      const { data } = await axios.post(`${SERVER}/auth/login`, request);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async handleSignUp (request) {
    try {
      const { data } = await axios.post(`${SERVER}/auth/register/member`, request);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async handleIdCheck (request) {
    try {
      const { data } = await axios.post(`${SERVER}/auth/check/member_id`, request);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async handleEmail (request) {
    try {
      const { data } = await axios.post(`${SERVER}/auth/email`, request);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async handleEmailCode (request) {
    try {
      const { data } = await axios.post(`${SERVER}/auth/email/verify`, request);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new signRepository();
