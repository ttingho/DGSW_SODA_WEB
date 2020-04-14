import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SecureLS from 'secure-ls';
import { inject, observer } from 'mobx-react';
import TokenVerification from 'lib/Token/TokenVerification';
import { withRouter } from 'react-router-dom';
import QuestionTemplate from 'components/QuestionWrite/QuestionWriteTemplate';
import GroupingState from 'lib/HookState/GroupingState';

const QuestionWriteContainer = ({ store, history }) => {
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('NotSelect');
  const [isUpload, setIsUpload] = useState(false);

  const [images, setImages] = useState([]);
  const [imageContents, setImageContents] = useState('업로드 된 이미지');

  const { modal } = store.dialog;
  const { uploadImage } = store.upload;
  const { requestInquiryWrite } = store.inquiry;

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const token = TokenVerification();

  const goBackFunction = () => {
    history.goBack(1);

    return;
  };

  // 업로드할 사진 취소
  const handleImageCancel = async imageIdx => {
    await images.some(data => {
      const { idx } = data;

      if(idx === imageIdx){
        images.splice(idx, 1);

        setImages(images);
        
        return true;
      }
    });

    if (images.length === 0) {
      setImageContents('업로드된 이미지');

      return;
    }

    if (images.length === 1) {
      setImageContents(images[0].name);
    }

    if (images.length > 1) {
      setImageContents(`${images[0].name} 외 ${images.length - 1}장`);
    }
  };

  // images url 값 설정
  const handleImageSetting = imageFiles => {
    const fileList = images;
    const fileLength = imageFiles.length;
    
    if (imageFiles.length > 5) {
      modal({
        title: 'Error',
        stateType: 'error',
        contents: '이미지는 최대 5장 까지 입니다!!!!.'
      });

      return;
    }

    if (images.length + imageFiles.length > 5 && isUpload) {
      modal({
        title: 'Error',
        stateType: 'error',
        contents: '이미지는 최대 5장 까지 입니다!!!!.'
      });

      return;
    }
    
    // url 값 변수 저장 && contents card 데이터 저장
    for (let i = 0; i < fileLength; i++) {
      const file = imageFiles[i];

      fileList.push(file);
    }
    
    if (images.length === 0) {
      setImageContents('업로드된 이미지');

      return;
    }

    if (images.length === 1) {
      setImageContents(images[0].name);
    }

    if (images.length > 1) {
      setImageContents(`${images[0].name} 외 ${images.length - 1}장`);
    }

    setImages(fileList);
    setIsUpload(true);
  };

  // file input 태그의 이벤트 value 가져오기
  const handleImageChange = event => {
    const imageFiles = event.target.files;

    handleImageSetting(imageFiles);
    
    event.target.value = null;
  };

  // 이미지 업로드
  const handleImageData = async () => {
    let picture = [];

    for(let image of images) {
      const formData = new FormData();

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

    await requestInquiryWrite(data).
      then(async (response) => {
        await modal({
          title: 'Success!',
          stateType: 'success',
          contents: '문의가 성공적으로 업로드 되었습니다! 관리자의 답변을 기다려 주세요.'
        });

        setTimeout(function() {
          history.goBack(1);
        }, 2000);
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

      history.goBack(1);

      return;
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
      images={images}
      handleImageCancel={handleImageCancel}
      goBackFunction={goBackFunction}
    />
  );
};

QuestionWriteContainer.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default inject('store')(observer(withRouter(QuestionWriteContainer)));

