import { autobind } from 'core-decorators';
import { action, observable } from 'mobx';
import uploadRepository from './uploadRepository';

@autobind
class uploadStore {
  @action async uploadImage(imageForm) {
    try {
      const response = await uploadRepository.uploadImage(imageForm);

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

export default uploadStore;
