import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import bambooRepository from './bambooRepository';

@autobind
class bambooStore {
  @observable bambooInfo = [];
  @observable bambooComment = [];

  @action async getBambooFeed(page, limit) {
    try {
      let { data } = await bambooRepository.getBambooFeed(page, limit);

      return new Promise((resolve, reject) => {
        resolve(data);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  @action
  async applyBambooPost (request) {
    try {
      const response = await bambooRepository.applyBambooPost(request);

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
  async getBambooComment (page, limit, bambooIdx) {
    try {
      const response = await bambooRepository.getBambooComment(page, limit, bambooIdx);
      
      this.bambooComment = response.data.comments;
      
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
  async postBambooComment (request) {
    try {
      const response = await bambooRepository.postBambooComment(request);

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

export default bambooStore;