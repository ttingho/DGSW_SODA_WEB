import { action, observable } from 'mobx';
import { autobind } from 'core-decorators';
import inquiryRepository from './inquiryRepository';

@autobind
class questionStore {
  @observable inquiry = {};
  @observable answer = {};
  @observable isComplate = 0;

  @observable category = '전체';
  @observable pageIndex = 1;
  @observable inquiryList = [];
  @observable categoryInquiryList = [];
  @observable adminInquiryList = [];
  @observable adminCategoryInquiryList = [];
  @observable myInquiryList = [];
  @observable totalPage = 1;

  @action
  handlePageIndex (pageIndex) {
    this.pageIndex = pageIndex;
  }

  @action
  handleCategory (category) {
    this.category = category;
    this.initialPageIndex = 1;
  }

  @action
  async getInquiry (limit, page) {
    try {
      const response = await inquiryRepository.getInquiry(limit, page);

      this.inquiryList = response.data.question;
      this.totalPage = response.data.totalPage;
      
      return new Promise((resolve, reject) => {
        resolve(response.data);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async getAdminInquiry (limit, page) {
    try {
      const response = await inquiryRepository.getAdminInquiry(limit, page);

      this.adminInquiryList = response.data.question;
      this.totalPage = response.data.totalPage;

      return new Promise((resolve, reject) => {
        resolve(response.data);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async getCategoryInquiry (limit, page) {
    try {
      const response = await inquiryRepository.getCategoryInquiry(this.category, limit, page);
      
      this.categoryInquiryList = response.data.question;
      this.totalPage = response.data.totalPage;
      
      return new Promise((resolve, reject) => {
        resolve(response.data);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async getAdminCategoryInquiry (limit, page) {
    try {
      const response = await inquiryRepository.getAdminCategoryInquiry(this.category, limit, page);

      this.adminCategoryInquiryList = response.data.question;
      this.totalPage = response.data.totalPage;
      
      return new Promise((resolve, reject) => {
        resolve(response.data);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async getMyInquiry (limit, page) {
    try {
      const response = await inquiryRepository.getMyInquiry(limit, page);
      
      this.myInquiryList = response.data.question;
      this.totalPage = response.data.totalPage;

      return new Promise((resolve, reject) => {
        resolve(response.data);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async requestInquiryWrite (request) {
    try {
      const response = await inquiryRepository.requestInquiryWrite(request);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async requestPutInquiryWrite (request) {
    try {
      const response = await inquiryRepository.requestPutInquiryWrite(request);
      
      await this.getInquiryDetail(request.idx);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async requestDeleteInquiryWrite (idx) {
    try {
      const response = await inquiryRepository.requestDeleteInquiryWrite(idx);
      
      localStorage.removeItem('inquiry_idx');

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async requestInquiryAnswer (request) {
    try {
      const response = await inquiryRepository.requestInquiryAnswer(request);
      
      await this.getInquiryDetail(request.questionIdx);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async requestPutInquiryAnswer (idx, request) {
    try {
      const response = await inquiryRepository.requestPutInquiryAnswer(request);
      
      await this.getInquiryDetail(idx);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async requestDeleteInquiryAnswer (idx, answerIdx) {
    try {
      const response = await inquiryRepository.requestDeleteInquiryAnswer(answerIdx);
      
      await this.getInquiryDetail(idx);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async getInquiryDetail (idx) {
    try {
      const response = await inquiryRepository.getInquiryDetail(idx);
      
      this.inquiry = response.data.question;
      
      this.answer = response.data.answer;

      this.isComplate = response.data.question.isComplate;

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
}

export default questionStore;