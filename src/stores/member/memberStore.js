import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import SecureLS from 'secure-ls';
import memberRepository from './memberRepository';

@autobind
class memberStore {
  @observable userProfileImage = '';

  @action
  async getMyInfo() {  //  자신 정보 조회
    try {
      const response = await memberRepository.getMyInfo();
      this.userProfileImage = response.data.member.profileImage;

      const ls = new SecureLS({ encodingType: 'aes' });
      ls.set('user-info', response.data.member);
      
      return new Promise((resolve, reject) => {
        resolve(response.data.member);
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
    } finally { // 수정된 내용이 바로 적용 되기 위함
      const response = await memberRepository.getMyInfo();
      this.userProfileImage = response.data.member.profileImage;

      const ls = new SecureLS({ encodingType: 'aes' });

      ls.set('user-info', response.data.member);
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