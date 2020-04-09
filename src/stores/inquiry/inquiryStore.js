import { action, observable } from 'mobx';
import { autobind } from 'core-decorators';
import inquiryRepository from './inquiryRepository';

@autobind
class questionStore {
  @observable inquiryDetail = {};

  @observable category = '전체';
  @observable inquiryList = [];
  @observable categoryInquiryList = [];
  @observable adminInquiryList = [];
  @observable adminCategoryInquiryList = [];
  @observable totalPage = 1;

  @action
  handleCategory (category) {
    this.category = category;
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

      this.adminInquiryList = response.data.allQuestion;
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
  async requestInquiryAnswer (request) {
    try {
      const response = await inquiryRepository.requestInquiryAnswer(request);
      
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
      
      this.inquiryDetail = response.data;
      
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