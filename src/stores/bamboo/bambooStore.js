import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import bambooRepository from './bambooRepository';

@autobind
class bambooStore {
  @observable bambooInfo = [];

  @action async getBambooFeed() {
    try {
      const { data } = await bambooRepository.getBambooFeed();
      console.log(data);
      
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

export default bambooStore;