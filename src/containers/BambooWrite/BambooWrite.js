import React, { useState, useEffect, useRef } from 'react';
import { Prompt, withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Template from 'components/BambooWrite/BambooWriteTemplate';
import GroupingState from 'lib/HookState/GroupingState';
import DEFAULT_PROFILE from 'assets/image/panda.jpg';

const BambooWrite = ({ store, history }) => {
  const blank_pattern = /^\s+|\s+$/g;
  const maxImageSize = 4 * 1024 * 1024;

  const { modal } = store.dialog;
  const { applyBambooPost } = store.bamboo;
  const { uploadImage } = store.upload;

  const [contents, setContents] = useState('');
  const [name, setName] = useState('익명의 판다');
  const [profileSrc, setProfileSrc] = useState(DEFAULT_PROFILE);
  const [accessToken, setAccessToken] = useState('');

  const [images, setImages] = useState([]);
  const [imgBase64, setImgBase64] = useState([]);
  // const [imageContents, setImageContents] = useState('업로드된 이미지');
  const [imageSize, setImageSize] = useState(0);

  // 익명 타입 : anonymous, 실명 타입 : realname, 기본값 : empty
  const [isType, setIsType] = useState('anonymous');

  // 업로드 박스 핸들링 타입
  // const [isUpload, setIsUpload] = useState(false);

  // Prompt 제어 state
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  // Component Will Mount, Component Did Mount
  const useComponentDidMount = func => useEffect(func, []);

  const useComponentWillMount = func => {
    const willMount = useRef(true);
  
    if (willMount.current) {
      func();
    }
  
    useComponentDidMount(() => {
      willMount.current = false;
    });
  };

  const navigate = path => {
    history.push(path);
  };

  const handleBlockedNavigation = nextLocation => {
    if (!isConfirmed) {  
      modal({
        modalType: 'basic',
        title: 'Warning!',
        contents: '작성된 내용이 사라질 수 있습니다. 이동하시겠습니까?',
        confirmFunc: async () => {
          await setIsConfirmed(true);

          await navigate(nextLocation.pathname);
        }
      });

      return false;
    }

    return true;
  };

  const handleInitialState = () => {
    setContents('');
    setName('익명의 판다');
    setProfileSrc(DEFAULT_PROFILE);
    setAccessToken('');
    setImages([]);
    setImgBase64([]);
    setIsType('anonymous');
    setImageSize(0);
    // setImageContents('업로드된 이미지');
  };

  const handleIsType = event => {
    const type = event.target.value;

    if (type === isType) return;
    
    setIsType(type);
  };

  const handleImageSize = () => {
    let fileSize = 0;

    for (let i = 0; i < images.length; i++) {
      const file = images[i];

      fileSize += file.size;  
    }

    setImageSize(fileSize);
  };

  const handlImageBase64 = async () => {
    let newstate = [];
    
    const processImgBase64 = img => {
      let url = URL.createObjectURL(img);

      newstate = [...newstate, url];
    };

    for (let i = 0; i < images.length; i++) {
      await processImgBase64(images[i]);
    }

    setImgBase64(newstate);
  };

  const handleArrangeFiles = () => {
    images.forEach((data, idx) => {
      data.idx = idx;
    });
  };

  const handleImageSetting = imageFiles => {
    const fileList = images;

    const fileLength = imageFiles.length;
    
    for (let i = 0; i < fileLength; i++) {
      const file = imageFiles[i];

      fileList.push(file);
    }

    // if (images.length === 0) {
    //   setImageContents('업로드된 이미지');

    //   return;
    // }

    // if (images.length > 1) {
    //   setImageContents(`${images[0].name} 외 ${images.length - 1}장`);
    // }

    // if (images.length === 1) {
    //   setImageContents(images[0].name);
    // }

    setImages(fileList);

    handleArrangeFiles();
  };

  // const handleIsUpload = event => {
  //   if (images.length === 0 && !isUpload) return;

  //   event.preventDefault();

  //   if (event.target === event.currentTarget) setIsUpload(!isUpload);
  // };

  const handleImageCancel = async canceledIdx => {
    await images.some(data => {
      const { idx } = data;

      if(idx === canceledIdx){
        images.splice(idx, 1);

        setImages(images);
        
        return true;
      }
    });

    if (images.length === 0) {
      // setImageContents('업로드된 이미지');

      setImages([]);

      setImgBase64([]);

      return;
    }

    // if (images.length > 1) {
    //   setImageContents(`${images[0].name} 외 ${images.length - 1}장`);
    // }

    // if (images.length === 1) {
    //   setImageContents(images[0].name);
    // }

    await handleArrangeFiles();

    await handleImageSize();

    await handlImageBase64();

    // setIsUpload(false);
  };

  const handleImageChange = event => {
    // setIsUpload(false);

    let imageFiles;

    imageFiles = event.target.files;
    
    handleImageSetting(imageFiles);

    handleImageSize();

    handlImageBase64();

    event.target.value = null;
  };

  const handleFaceBookLogin = response => {
    if (response.status === 'connected') return;

    setName(response.name);
    
    setProfileSrc(response.picture.data.url);
    
    setAccessToken(response.accessToken);
  };

  const handleImageName = (imageFileName) => {
    let splitedName = '';

    const typeName = imageFileName[imageFileName.length - 1];
    
    if(imageFileName.length > 2){
      for(let i = 0; i < imageFileName.length; i++){
        if(i === imageFileName.length - 2){
          splitedName = splitedName.concat(imageFileName[i]);
        } else if(i === imageFileName.length - 1 || imageFileName[i] === ''){
          continue;
        } else {
          splitedName = splitedName.concat(imageFileName[i]).concat('_');
        }
      }
    } else {
      splitedName = imageFileName[0];
    }

    return { splitedName, typeName };
  };

  const handleImageRandomedName = () => {
    const uploadName = 'SB_IMG_';

    const randomName =  (Math.floor(Math.random() * 100000000000) + 10000).toString();
    
    return uploadName.concat(randomName);
  };

  const handleImageFormData = async() => {
    let picture = [];

    let isUploadError = false;

    if (imageSize > maxImageSize) {
      
      return { picture: [], isUploadError: true };
    }

    for(let image of images){
      const formData = new FormData();

      const { name, type, isDefault, originalName, uploadName  } = image;
      
      const isImg = type.split('/');

      if(isImg[0] !== 'image'){
        isUploadError = true;
       
        modal({
          title: 'Error',
          stateType: 'error',
          contents: '이미지만 올려주세요.'
        });
        
        break;
      }

      const { splitedName, typeName } = handleImageName(name.split('.'));
      
      const randomedName = handleImageRandomedName();

      formData.append('img', image);

      await uploadImage(formData)
        .then(response => {
          const data = {
            // originalName: splitedName,
            uploadName: response.data.imgs[0].fileName,
            type: response.data.imgs[0].fileType
          };

          picture = [...picture, data];
        }).catch(error => {
          const { status } = error.response;
          
          isUploadError = true;
          
          if(status === 400){
            modal({
              title: 'Error',
              stateType: 'error',
              contents: '이미지가 아닙니다.'
            });
            
            return true;
          }
        });
    }

    return { picture, isUploadError };
  };

  const handlePostRequest = async () => {
    let data;

    contents.trim();
    
    const { picture, isUploadError } = await handleImageFormData();

    if (isType === 'empty') {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '게시물 타입을 지정해 주세요!'
      });

      return;
    }

    if (contents.length === 0) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '대나무(이야기)가 비어있습니다!'
      });

      return;
    }

    if (contents.length > 1000) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '대나무(이야기)를 1000자 이내로 입력해주세요!'
      });

      return;
    }

    if (contents.replace( blank_pattern, '' ) === '') {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '공백만 입력되었습니다.'
      });

      return;
    }

    if (imageSize > maxImageSize) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '이미지 파일 크기를 지켜주세요! (총 4MB 이하로 업로드 가능)'
      });

      return;
    }

    if (isType === 'anonymous') {
      if (images.length === 0) {
        data = {
          picture: null,
          name,
          profileImage: null,
          contents
        };
      } else {
        data = {
          picture,
          name,
          profileImage: null,
          contents
        };
      }
    }

    if (isType === 'realname') {
      if (images.length === 0) {
        data = {
          picture: null,
          name,
          profileImage: profileSrc,
          contents
        };
      } else {
        data = {
          picture,
          name,
          profileImage: profileSrc,
          contents
        };
      }
    }
    
    if (!isUploadError) {
      await applyBambooPost(data)
        .then(async response => {
          await modal({
            title: 'Success!',
            stateType: 'success',
            contents: '대나무(이야기)를 제보했습니다.',
            closeFunc: async () => {
              handleInitialState();

              await setIsConfirmed(true);

              await navigate('/');
            }
          });
        })
        .catch(async error => {
          const { status } = error.response;

          if (status === 400) {
            await modal({
              title: 'Error!',
              stateType: 'error',
              contents: '대나무가 국산이 아니네요. (양식이 올바르지 않습니다.)'
            });

            return;
          }
          
          if (status === 500) {
            await modal({
              title: 'Error!',
              stateType: 'error',
              contents: '대나무가 상했어요..ㅠㅠ 기다려주세요!'
            });

            return;
          }
        });
    }
  };

  useComponentWillMount(() => {
    if (handleBlockedNavigation) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  });

  useEffect(() => {
    if (isType === 'anonymous') {
      setName('익명의 판다');
      
      setProfileSrc(DEFAULT_PROFILE);
      
      setAccessToken('');
    }
  }, [isType]);

  useEffect(() => {
    return () => {
      onbeforeunload = null;
    };
  }, []);

  return (
    <>
      <Prompt
        when={true}
        message={handleBlockedNavigation}
      />
      <Template
        profileSrc={profileSrc}
        name={name}
        accessToken={accessToken}
        contentsObj={GroupingState('contents', contents, setContents)}
        images={images}
        imgBase64={imgBase64}
        handleImageCancel={handleImageCancel}
        isType={isType}
        handleIsType={handleIsType}
        handleImageChange={handleImageChange}
        handleFaceBookLogin={handleFaceBookLogin}
        handlePostRequest={handlePostRequest}
      />
    </>
  );
};

BambooWrite.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default inject('store')(observer(withRouter(BambooWrite)));
