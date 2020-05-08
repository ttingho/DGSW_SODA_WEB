import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import SecureLS from 'secure-ls';
import memberRepository from './memberRepository';

@autobind
class memberStore { 
  @action
  async getMyInfo() {  //  자신 정보 조회
    try {
      const response = await memberRepository.getMyInfo();

      const ls = new SecureLS({ encodingType: 'aes' });

      ls.set('user-info', response.data.member);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((reslove, reject) => {
        reject(error);
      });
    }
  }

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