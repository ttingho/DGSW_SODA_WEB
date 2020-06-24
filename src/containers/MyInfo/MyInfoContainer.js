import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import PROFILE_DEFAULT from 'assets/image/profile/profile.svg';
import ImageSrc from 'lib/Profile/ImageSrc';
import useStores from 'lib/HookState/useStore';
import MyInfoTemplate from 'components/MyInfo/MyInfoTemplate';
import MyInfoEmailModalContainer from './MyInfoEmailModalContainer.js';
import MyInfoPwModalContainer from './MyInfoPwModalContainer';

const MyInfoContainer = observer(({ history }) => {
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [isPwModal, setIsPwModal] = useState(false);
  const [image, setImage] = useState([]);

  const { store } = useStores();

  const { modal } = store.dialog;

  const { uploadImage } = store.upload;
  const { getMyInfo, userProfileImage, modifyMemberInfo } = store.member;

  const ls = new SecureLS({ encodingType: 'aes' });
  const userInfo = ls.get('user-info');
  const src = userInfo.profileImage;

  const [imgSrc, setImgSrc] = useState(ImageSrc(src, PROFILE_DEFAULT));

  async function fetchData() {
    await getMyInfo();
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {   // 프로필 수정 후 이미지만 새로 적용이 안되어 Store로 따로 처리    
    setImgSrc(ImageSrc(userProfileImage, PROFILE_DEFAULT));
  }, [userProfileImage]);

  const handleImageError = useCallback(e => {
    setImgSrc(PROFILE_DEFAULT);
  }, []);

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
            // getMyInfo();
            // history.push('/myinfo');
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
        const data = {
          uploadName: response.data.imgs[0].fileName,
          type: response.data.imgs[0].fileType
        };

        modifyMemberProfileImage(response.data.imgs[0].fileName, response.data.imgs[0].fileType);
        
        picture = [...picture, data];

      }).catch(error => {
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
    history.push('/');
  };

  const isSetModals = {
    setIsEmailModal,
    setIsPwModal,
  };

  return (
    <>
      <MyInfoTemplate 
        userInfo={userInfo}
        src={imgSrc}
        handleLogout={handleLogout}
        isSetModals={isSetModals}
        handleImageChange={handleImageChange}
        handleImageError={handleImageError}
        setBaseProfileImage={setBaseProfileImage}
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
});

MyInfoContainer.propTypes = {
  history: PropTypes.object,
  // store: PropTypes.object
};

// export default inject('store')(observer(withRouter(MyInfoContainer)));
export default withRouter(MyInfoContainer);