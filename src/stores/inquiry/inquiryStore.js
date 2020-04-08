import { action, observable } from 'mobx';
import { autobind } from 'core-decorators';
import inquiryRepository from './inquiryRepository';

@autobind
class questionStore {
  @observable inquiryDetail = {};

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