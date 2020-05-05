import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import memberRepository from './memberRepository';

@autobind
class memberStore { 
  @action
  async modifyMemberInfo (request) {
    try {
      const response = await memberRepository.modifyMemberInfo(request);
      
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
  async checkMemberPw (request) {
    try {
      const response = await memberRepository.checkMemberPw(request);
      
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

export default memberStore;