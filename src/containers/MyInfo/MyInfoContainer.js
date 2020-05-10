import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import { inject, observer } from 'mobx-react';
import MyInfoTemplate from 'components/MyInfo/MyInfoTemplate';
import MyInfoEmailModalContainer from './MyInfoEmailModalContainer.js';
import MyInfoPwModalContainer from './MyInfoPwModalContainer';

const MyInfoContainer = ({ store, history }) => {
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [isPwModal, setIsPwModal] = useState(false);
  const [image, setImage] = useState([]);
  const { modal } = store.dialog;

  const { uploadImage } = store.upload;
  const { modifyMemberInfo, getMyInfo } = store.member;

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const handleImageSetting = async imageFile => {
    const file = image;

    const fileData = imageFile[0];
    
    file.push(fileData);
    
    setImage(file);

    await handleImageData();

    await modifyMemberInfo();
  };

  const setBaseProfileImage = async () => {
    const profileImage = {
      uploadName: null,
      type: null,
    };

    let data = {
      profileImage,
    };

    await modifyMemberInfo(data)
      .then(response => {
        modal({
          title: 'Success',
          stateType: 'success',
          contents: '프로필 사진 수정 성공!', 
          closeFunc: () => { 
            getMyInfo();
            history.push('/myinfo');
          }
        });
      }).catch(async error => {
        const { status } = error.response;

        if (status === 400) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '양식이 맞지 않아요!'
          });

          return;
        }

        if (status === 403) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '비정상적인 접근!'
          });

          return;
        }

        if (status === 500) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '서버 에러! 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  const modifyMemberProfileImage = async (uploadName, type) => {

    const profileImage = {
      uploadName,
      type,
    };

    const data = {
      profileImage
    };

    await modifyMemberInfo(data)
      .then(response => {
        modal({
          title: 'Success',
          stateType: 'success',
          contents: '프로필 사진 수정 성공!', 
          closeFunc: () => { 
            getMyInfo();
            history.push('/myinfo');
          }
        });
      }).catch(async error => {
        const { status } = error.response;

        if (status === 400) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '양식이 맞지 않아요!'
          });

          return;
        }

        if (status === 403) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '비정상적인 접근!'
          });

          return;
        }

        if (status === 500) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '서버 에러! 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  const handleImageChange = event => {
    const imageFile = event.target.files;

    handleImageSetting(imageFile);

    event.target.value = null;
  };

  const handleImageData = async () => {
    let picture = [];

    const formData = new FormData();

    formData.append('img', image[0]);

    await uploadImage(formData)
      .then(response => {
        console.log(response);
        const data = {
          uploadName: response.data.imgs[0].fileName,
          type: response.data.imgs[0].fileType
        };

        modifyMemberProfileImage(response.data.imgs[0].fileName, response.data.imgs[0].fileType);
        
        picture = [...picture, data];

      }).catch(error => {
        console.log(error);
        const { status } = error.response;

        if(status === 400){
          modal({
            title: 'Error',
            stateType: 'error',
            contents: '이미지가 아닙니다.'
          });
          
          return true;
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('soda-token');
    localStorage.removeItem('soda-reToken');
    sessionStorage.removeItem('soda-token');
    sessionStorage.removeItem('soda-reToken');
    
    const ls = new SecureLS({ encodingType: 'aes' });

    ls.removeAll();

    history.goBack(1);
  };

  const isSetModals = {
    setIsEmailModal,
    setIsPwModal,
  };

  return (
    <>
      <MyInfoTemplate 
        userInfo={userInfo}
        handleLogout={handleLogout}
        isSetModals={isSetModals}
        handleImageChange={handleImageChange}
      />
      {
        isEmailModal
          ? <MyInfoEmailModalContainer setIsEmailModal={setIsEmailModal}/>
          : isPwModal
            ? <MyInfoPwModalContainer setIsPwModal={setIsPwModal}/>
            : <></>
      }
    </>
  );
};

MyInfoContainer.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object
};

export default inject('store')(observer(withRouter(MyInfoContainer)));