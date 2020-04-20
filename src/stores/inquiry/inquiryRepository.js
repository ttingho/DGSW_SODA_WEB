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

  async requestPutInquiryWrite (request) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.put(`${SERVER}/question`, request, {
        headers: {
          'x-access-token' : token,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async requestDeleteInquiryWrite (idx) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.delete(`${SERVER}/question?idx=${idx}`, {
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

  async requestPutInquiryAnswer (request) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.put(`${SERVER}/question/answer`,request, {
        headers: {
          'x-access-token' : token,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async requestDeleteInquiryAnswer (idx) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.delete(`${SERVER}/question/answer?idx=${idx}`, {
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

  async getInquiry (limit, page) {
    try {
      const { data } = await axios.get(`${SERVER}/question?limit=${limit}&page=${page}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAdminInquiry (limit, page) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.get(`${SERVER}/question/admin?limit=${limit}&page=${page}`, {
        headers: {
          'x-access-token': token,
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryInquiry (category, limit, page) {
    try {
      const { data } = await axios.get(`${SERVER}/question/category?category=${category}&limit=${limit}&page=${page}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAdminCategoryInquiry (category, limit, page) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.get(`${SERVER}/question/admin/category?category=${category}&limit=${limit}&page=${page}`, {
        headers: {
          'x-access-token': token
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMyInquiry (limit, page) {
    const token = TokenVerification() === 'localT' ? localStorage.getItem('soda-token') : sessionStorage.getItem('soda-token');

    try {
      const { data } = await axios.get(`${SERVER}/question/my?limit=${limit}&page=${page}`, {
        headers: {
          'x-access-token': token,
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new inquiryRepository();