import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import sha512 from 'js-sha512';
import UpTemplate from 'components/Sign/UpTemplate';
import SignUpFormCheck from 'lib/Sign/SignUpFormCheck';

const SignUpContainer = ({
  signType,
  isCertified,
  changeSign,
  idObj,
  idCheckObj,
  pwObj,
  checkPwObj,
  isRightPwObj,
  nameObj,
  emailObj,
  emailCodeObj,
  // phoneObj,
  // nickNameObj,
  profileImageObj,
  isCheckedEmailObj,
  pageObj,
  setIsEmailModal,
  modal,
  handleSignUp,
  handleIdCheck,
  handleEmail,
  handleEmailCode,
  // handleCertification,
  uploadImage,
}) => {
  const { id } = idObj;
  const { pw } = pwObj;
  const { checkPw } = checkPwObj;
  const { name } = nameObj;
  const { email } = emailObj;
  const { emailCode, setEmailCode } = emailCodeObj;
  // const { phone } = phoneObj;
  // const { nickName } = nickNameObj;
  const { profileImage } = profileImageObj;
  const { page, setPage } = pageObj;
  const { idCheck, setIdCheck } = idCheckObj;
  const { isCheckedEmail, setIsCheckedEmail } = isCheckedEmailObj;
  const { isRightPw, setIsRightPw } = isRightPwObj;

  /* 서버에 실질적으로 보낼 profileImage */
  let picture = {};

  /* 버튼 로딩 상태 */
  const [isLoading, setIsLoading] = useState(false);

  const userObj = {
    id,
    pw,
    checkPw,
    name,
    email,
    // phone,
    // nickName,
    idCheck,
    isRightPw,
    isCheckedEmail
  };

  const handleCertification = async() => {
    let data = {
      code: emailCode,
      email: email
    };

    await handleEmailCode(data)
      .then((response) => {
        setIsCheckedEmail(true);
      }).catch((error) => {
        const { status } = error.response.data;

        if (status === 400) {
          modal({
            title: 'Warning!',
            stateType: 'warning',
            contents: '코드를 입력해주세요.'
          });
          return;
        } 
        if (status === 403) {
          modal({
            title: 'Warning!',
            stateType: 'warning',
            contents: '올바른 검증 코드를 입력해주세요.'
          });
          return;
        }
      });
  };

  const handleNextPage = useCallback(async pageType => {
    const { isFormCheck, type, text  } = SignUpFormCheck(userObj, page);
    
    if (isFormCheck === false) {  // page1과 2는 이곳을 통해 처리가 됨.
      modal({
        title: 'Warning!',
        stateType: type,
        contents: text
      });
      return;
    }

    if (pageType === 3) { // page 3으로 가려고 할 때
      await handleSendEmail();
      setPage(pageType);
      return;
    }
    if (pageType === 4) { // page 4로 가려고 할 때
      let data = {
        code: emailCode,
        email: email
      };
  
      await handleEmailCode(data)
        .then((response) => { // 인증 성공 시 다음 페이지, 이메일 인증 여부 추가
          setPage(pageType);
          setIsCheckedEmail(true);
        }).catch((error) => { // 실패 시 사유 모달 띄우기
          const { status } = error.response.data;
  
          if (status === 400) {
            modal({
              title: 'Warning!',
              stateType: 'warning',
              contents: '코드를 입력해주세요.'
            });
            return;
          } 
          if (status === 403) {
            modal({
              title: 'Warning!',
              stateType: 'warning',
              contents: '올바른 검증 코드를 입력해주세요.'
            });
            return;
          }
        });

      return;
    }
    
    setPage(pageType);
  }, [userObj, page, isCheckedEmail]);

  

  const handleFocusOutId = async() => {
    if (id === '') {
      setIdCheck(0);  // 아무런 값도 입력하지 않았을 경우
      return;
    } else if (!(/^[a-zA-Z0-9]{4,20}$/).test(id)) {
      setIdCheck(3);  // 올바르지 않는 형식일 경우
    } else {
      let data = {
        memberId: id
      };

      await handleIdCheck(data)
        .then((response) => {
          if (response.status === 200) {
            setIdCheck(1);  // 사용 가능한 아이디일 경우
          }
        }).catch((error) => {
          const { status } = error.response.data;

          if (status === 400) {
            setIdCheck(2);  // 중복된 아이디일 경우
          }
        });
    }
  };

  const handleCheckPw = () => {
    if (checkPw === '') {
      setIsRightPw(0);  // 처음 초기화 상태일 경우
    } else if (!(/^[a-zA-Z0-9!@#$%^*+=-]{7,20}$/).test(pw)) {
      setIsRightPw(3); // 비밀번호 형식이 틀릴 경우
    } else if (pw === checkPw) {
      setIsRightPw(1);  // 비밀번호가 같을 경우
    } else {      
      setIsRightPw(2); // 비밀번호가 같지 않을 경우
    }
  };

  const handleSendEmail = async() => {
    setEmailCode('');  // 이메일 인증 코드 초기화
    setIsCheckedEmail(false);  // 이메일 인증 여부 해제

    if (email === '') {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '이메일을 입력해주세요.'
      });
      return;
    } else if (!(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i).test(email)) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '이메일 형식을 지켜주세요.'
      });
      return;
    }

    let data = {
      email: email
    };
    
    await handleEmail(data)
      .then((response) => {
        // if (response.status === 200) {
        //   setIsEmailModal(true);
        // }
      }).catch((error) => {
        const { status } = error.response.data;

        if (status === 400) {
          modal({
            title: 'Warning!',
            stateType: 'warning',
            contents: '이미 회원가입 된 이메일 입니다.'
          });
        } else if (status === 403) {
          modal({
            title: 'Warning!',
            stateType: 'warning',
            contents: '유효하지 않은 이메일 입니다.'
          });
        }
      });
  };

  const handleImageUploadName = () => {
    const uploadName = 'DW_IMG_';
    const randomName =  (Math.floor(Math.random() * 100000000000) + 10000).toString();
    return uploadName.concat(randomName);
  };

  const handleImageFormData = () => {
    let formData = new FormData();

    if (profileImage !== null) {
      const isImg = profileImage.type.split('/');
      // const imageName = profileImage.name;

      if(isImg[0] !== 'image') {
        modal({
          title: 'Error',
          stateType: 'error',
          contents: '이미지만 올려주세요.'
        });
        
        return;
      }
      
      // const uploadName = handleImageUploadName();
  
      formData.append('img', profileImage);
      // formData.append('name', uploadName);
      // picture = {uploadName, type};
      
      return { formData };
    }
  };

  const requestSignUp = async () => {
    if (profileImage === null) {  // 기본 프로필 이미지 일때
      const data = {
        memberId: id,
        pw: sha512(pw),
        name: name,
        // phone: phone,
        email: email,
        profileImage: {
          uploadName: null,
          type: null
        },
        // nickName: nickName,
        certification: isCheckedEmail,
        consent: true
      };

      setIsLoading(true);

      await handleSignUp(data)
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);

            modal({
              title: 'Success!',
              stateType: 'success',
              contents: '회원가입에 성공했습니다.',
              closeFunc: changeSign,
            });
          }
        }).catch((error) => {
          setIsLoading(false);
          
          const { status } = error.response.data;
          
          if (status === 400) {
            modal({
              title: 'Error!',
              stateType: 'error',
              contents: '회원가입 검증 오류',
            });
          } else if (status === 500) {
            modal({
              title: 'Error!',
              stateType: 'error',
              contents: 'Server Error...',
            });
          }
        });
    } else {
      const { formData, isNotImg } = await handleImageFormData();

      setIsLoading(true);
  
      let isUpload = true;  // 이미지 업로드 성공여부에 따라 handleSignUp을 실행함
  
      await uploadImage(formData)
        .then((response) => {
          picture = {
            uploadName: response.data.imgs[0].fileName,
            type: response.data.imgs[0].fileType
          };
        }).catch(error => {
          const { status } = error.response.data;  
          isUpload = false;
  
          if (status === 400) {
            modal({
              title: 'Error!',
              stateType: 'error',
              contents: '이미지가 아닙니다.'
            });
            return;
          } else if (status === 500) {
            modal({
              title: 'Error!',
              stateType: 'error',
              contents: 'Server Error...',
            });
            return;
          }
        });

      const data = {
        memberId: id,
        pw: sha512(pw),
        name: name,
        email: email,
        profileImage: picture,
        // nickName: nickName,
        certification: isCheckedEmail,
        consent: true
      };
      
      if (isUpload) {
        await handleSignUp(data)
          .then((response) => {
            if (response.status === 200) {
              setIsLoading(false);

              modal({
                title: 'Success!',
                stateType: 'success',
                contents: '회원가입에 성공했습니다.',
                closeFunc: changeSign,
              });
            }
          }).catch((error)=> {
            setIsLoading(false);
            
            const { status } = error.response;
            
            if (status === 400) {
              modal({
                title: 'Error!',
                stateType: 'error',
                contents: '회원가입 검증 오류',
              });
            } else if (status === 500) {
              modal({
                title: 'Error!',
                stateType: 'error',
                contents: 'Server Error...',
              });
            }
          });
      }
    }
  };

  return (
    <>
      <UpTemplate
        signType={signType}
        changeSign={changeSign}
        idObj={idObj}
        pwObj={pwObj}
        checkPwObj={checkPwObj}
        nameObj={nameObj}
        emailObj={emailObj}
        emailCodeObj={emailCodeObj}
        // phoneObj={phoneObj}
        // nickNameObj={nickNameObj}
        profileImageObj={profileImageObj}
        isCheckedEmailObj={isCheckedEmailObj}
        pageObj={pageObj}
        idCheck={idCheck}
        isRightPw={isRightPw}
        handleNextPage={handleNextPage}
        handleSendEmail={handleSendEmail}
        handleFocusOutId={handleFocusOutId}
        handleCheckPw={handleCheckPw}
        handleCertification={handleCertification}
        requestSignUp={requestSignUp}
      />
    </>
  );
};

SignUpContainer.propTypes = {
  signType: PropTypes.bool,
  isCertified: PropTypes.bool,
  changeSign: PropTypes.func,
  idObj: PropTypes.object,
  idCheckObj: PropTypes.object,
  pwObj: PropTypes.object,
  checkPwObj: PropTypes.object,
  isRightPwObj: PropTypes.object,
  nameObj: PropTypes.object,
  emailObj: PropTypes.object,
  emailCodeObj: PropTypes.object,
  // phoneObj: PropTypes.object,
  // nickNameObj: PropTypes.object,
  profileImageObj: PropTypes.object,
  isCheckedEmailObj: PropTypes.object,
  pageObj: PropTypes.object,
  setIsEmailModal: PropTypes.func,
  modal: PropTypes.func,
  handleSignUp: PropTypes.func,
  handleIdCheck: PropTypes.func,
  handleEmail: PropTypes.func,
  handleCertification: PropTypes.func,
  handleEmailCode:PropTypes.func,
  uploadImage: PropTypes.func,
};

export default SignUpContainer;