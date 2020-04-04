import { action } from 'mobx';
import { autobind } from 'core-decorators';
import questionRepository from './questionRepository';

@autobind
class questionStore {

  @action
  async postQuestionWrite (request) {
    try {
      const response = await questionRepository.postQuestionWrite(request);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      console.error(error);

      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async getQuestionDetail (idx) {
    try {
      const response = await questionRepository.getQuestionDetail(idx);
      
      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      console.error(error);

      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async postQuestionAnswer (request) {
    try {
      const response = await questionRepository.postQuestionAnswer(request);
      
      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      console.error(error);

      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
}

export default questionStore;