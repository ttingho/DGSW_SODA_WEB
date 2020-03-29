import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import adminRepository from './adminRepository';

@autobind
class adminStore {
  @observable pendingList = [];

  @action
  async getPendingList () {
    try {
      const response = await adminRepository.getPendingList();

      this.pendingList = response.data.bamboo;

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
  async requestBambooPost (request) {
    try {
      const response = await adminRepository.requestBambooPost(request);

      await this.getPendingList();

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

export default adminStore;
