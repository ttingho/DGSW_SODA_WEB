import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SecureLS from 'secure-ls';
import { inject, observer } from 'mobx-react';
import TokenVerification from 'lib/Token/TokenVerification';
import { withRouter } from 'react-router-dom';
import QuestionTemplate from 'components/QuestionWrite/QuestionWriteTemplate';
import GroupingState from 'lib/HookState/GroupingState';

const QuestionWriteContainer = ({ store }) => {
  const maxImageSize = 4 * 1024 * 1024;

  const [contents, setContents] = useState('');
  const [contentsCard, setContentsCard] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('NotSelect');
  const [isUpload, setIsUpload] = useState(false);

  const [images, setImages] = useState([]);
  const [imageBase64, setImageBase64] = useState([]);
  const [imageContents, setImageContents] = useState('업로드 된 이미지');
  const [imageSize, setImageSize] = useState(0);

  const { modal } = store.dialog;
  const { uploadImage } = store.upload;
  const { postQuestionWrite } = store.question;

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const token = TokenVerification();


  const handleIsUpload = event => {
    if (images.length ===0 && !isUpload) return;

    if (images.length !== 0 && isUpload) {
          
    }
  };

  // 사진 미리보기 용 이미지 url 값 설정
  const handlImageBase64 = async () => {
    let newState = [];

    const processImgBase64 = img => {
      let url = URL.createObjectURL(img);

      newState = [...newState, url];
    };

    for (let i = 0; i < images.length; i++) {
      await processImgBase64(images[i]);
    }

    setImageBase64(newState);
  };

  // 사진 크기 설정
  const handleImageSize = () => {
    let fileSize = 0;

    for (let i = 0; i < images.length; i++) {
      const file = images[i];

      fileSize += file.size;
    }

    setImageSize(fileSize);
  };

  // images url 값 설정
  const handleImageSetting = imageFiles => {
    const fileList = images;
    const fileLength = imageFiles.length;

    // url 값 변수 저장 && contents card 데이터 저장
    for (let i = 0; i < fileLength; i++) {
      const file = imageFiles[i];
      
      contentsCard.push(file.name);
      fileList.push(file);
    }
    
    if (fileLength === 0) {
      setImageContents('업로드된 이미지');

      return;
    }

    if (fileLength === 1) {
      setImageContents(`${images[0].name}`);
    }

    if (fileLength > 1) {
      setImageContents(`${images[0].name} 외 ${images.length - 1}장`);
    }

    setImages(fileList);
    setIsUpload(true);
  };

  // file input 태그의 이벤트 value 가져오기
  const handleImageChange = event => {
    const imageFiles = event.target.files;

    handleImageSetting(imageFiles);

    handlImageBase64();
    
    event.target.value = null;
  };

  // 이미지 업로드
  const handleImageData = async () => {
    let picture = [];

    for(let image of images) {
      const formData = new FormData();
      console.log(images);
      
      formData.append('img', image);

      await uploadImage(formData)
        .then(response => {
          const data = {
            uploadName: response.data.imgs[0].fileName,
            type: response.data.imgs[0].fileType
          };

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
    }

    return { picture };
  };

  // 건의사항 업로드
  const handleQuestionWrite = async () => {
    let data;

    const { picture } = await handleImageData();
    
    if (images.length === 0) {
      data = {
        title,
        contents,
        category,
        picture: null,
      };
    } else {
      data = {
        title,
        contents,
        category,
        picture,
      };
    }

    if (contents.length === 0 || title.length === 0) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '빈칸을 채워 주세요!'
      });

      return;
    }

    if (category === 'NotSelect') {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '카테고리를 선택해 주세요!'
      });

      return;
    }

    await postQuestionWrite(data).
      then(async (response) => {
        await modal({
          title: 'Success!',
          stateType: 'success',
          contents: '문의가 성공적으로 업로드 되었습니다! 관리자의 답변을 기다려 주세요.'
        });
      })
      .catch(async (error) => {
        const { status } = error.response;

        if (status === 400) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '양식이 맞지 않아요!'
          });

          return;
        }

        if (status === 500) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '홀리 쉣 서버 에러네요 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };
  
  const setMemberInfo = async () => {
    if (token ==='empty' || userInfo === null) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '건의사항 작성은 로그인 후 이용 가능 합니다!',
      });
    }
  };

  useEffect(() => {
    setMemberInfo();
  }, []);

  return (
    <QuestionTemplate
      contentsObj={GroupingState('contents', contents, setContents)}
      titleObj={GroupingState('title', title, setTitle)}
      categoryObj={GroupingState('category', category, setCategory)}
      handleQuestionWrite={handleQuestionWrite}
      imageContents={imageContents}
      handleImageChange={handleImageChange}
      imageBase64={imageBase64}
      handleIsUpload={handleIsUpload}
      isUpload={isUpload}
      contentsCard={contentsCard}
      images={images}
    />
  );
};

export default inject('store')(observer(withRouter(QuestionWriteContainer)));

