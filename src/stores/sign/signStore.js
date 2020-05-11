import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import signRepository from './signRepository';

@autobind
class signStore {
  @observable isModal = false;
  @observable isCertified = false;

  @action
  handleIsSignModal (bool) {
    this.isModal = bool;
  }

  @action
  handleIsCertified (bool) {
    this.isCertified = bool;
  }

  @action
  async handleSignIn (request) {
    try {
      const response = await signRepository.handleSignIn(request);
      
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
  async handleSignUp (request) {
    try {
      const response = await signRepository.handleSignUp(request);
      
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
  async handleIdCheck (request) {
    try {
      const response = await signRepository.handleIdCheck(request);

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
  async handleEmail (request) {
    try {
      this.isCertified = false;   // 인증 확인 초기화
      const response = await signRepository.handleEmail(request);

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
  async handleEmailCode (request) {
    try {
      const response = await signRepository.handleEmailCode(request);
      this.isCertified = true;   // 인증 확인 초기화
      
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

export default signStore;
