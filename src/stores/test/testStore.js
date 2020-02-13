import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import testRepository from './testRepository';

@autobind
class testStore {
  @observable testInfo = {};

  @action async getTest() {
    try {
      const { data } = await testRepository.getTest();
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
}

export default testStore;