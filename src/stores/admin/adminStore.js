import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import adminRepository from './adminRepository';

@autobind
class adminStore {
  @observable pendingList = [];

  @action
  async getPendingList() {
    try {
      const response = await adminRepository.getPendingList();

      this.pendingList = response.data.post;

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
