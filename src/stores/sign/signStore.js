import { action } from 'mobx';
import { autobind } from 'core-decorators';
import signRepository from './signRepository';

@autobind
class signStore {

  @action
  async handleSignIn (request) {
    try {
      const response = await signRepository.handleSignIn(request);
      
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
  async handleSignUp (request) {
    try {
      const response = await signRepository.handleSignUp(request);
      
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

export default signStore;
