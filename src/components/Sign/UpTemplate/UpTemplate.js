import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { color } from 'styles/color/color_scheme';
import style from './UpTemplate.scss';
import SignInput from 'components/Common/SignInput';
import ImageIcon from 'components/Common/ImageIcon';
import ImageSrc from 'lib/Profile/ImageSrc';
import Button from 'components/Common/Button';
import { typography } from 'styles/typography/typography_scheme';
import { MdCameraAlt, MdCheck, MdClose } from 'react-icons/md';
import PROFILE_DEFAULT from 'assets/image/profile/profile.svg';

const { size } = typography;
const cx = classNames.bind(style);

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: color.black,
    boxShadow: theme.shadows[1],
    fontSize: size.s1,
  },
}))(Tooltip);

const UpTemplate = ({
  signType,
  changeSign,
  idObj,
  pwObj,
  checkPwObj,
  nameObj,
  emailObj,
  emailCodeObj,
  // phoneObj,
  // nickNameObj,
  profileImageObj,
  isCheckedEmailObj,
  pageObj,
  idCheck,
  isRightPw,
  handleNextPage,
  // handleEmailModal,
  handleFocusOutId,
  handleCheckPw,
  handleCertification,
  requestSignUp
}) => {
  const { id, setId } = idObj;
  const { pw, setPw } = pwObj;
  const { checkPw, setCheckPw } = checkPwObj;
  const { name, setName } = nameObj;
  const { email, setEmail } = emailObj;
  const { emailCode, setEmailCode } = emailCodeObj;
  // const { phone, setPhone } = phoneObj;
  // const { nickName, setNickName } = nickNameObj;
  const { profileImage, setProfileImage } = profileImageObj;
  const { isCheckedEmail } = isCheckedEmailObj;
  const { page, setPage } = pageObj;

  const [imgBase64, setImgBase64] = useState(PROFILE_DEFAULT); // 선택한 프로필을 미리보기 위함

  const handleChangeFile = (event) => { // 선택한 프로필을 미리보기 위한 함수
    let reader = new FileReader();
    
    reader.onloadend = () => {
      const base64 = reader.result;
      
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (event.target.files[0]) {
      const { type } = event.target.files[0];
      const isImg = type.split('/');
      const isSvg = isImg[1].indexOf('svg');

      if (isImg[0] !== 'image' || isSvg !== -1) {
        alert('jpg, jpeg, gif, png 형식의 파일만 첨부하실 수 있습니다.');
        event.preventDefault();
      } else {
        reader.readAsDataURL(event.target.files[0]);
        setProfileImage(event.target.files[0]);
      }
    }
  };

  const pageType = () => {
    if (page === 1) {
      return (
        <div className={cx('UpTemplate-page1')}>
          <div className={cx('UpTemplate-page1-idWrap')}>
            <LightTooltip placement='top-start' title='아이디: 알파벳과 숫자, 4글자 ~ 20글자'>
              <div>
                <SignInput
                  value={id}
                  setValue={setId}
                  placeholder={'아이디'}
                  handleFocusOut={handleFocusOutId}
                />
              </div>
            </LightTooltip>
            <div className={cx('UpTemplate-page1-idWrap-idCheck')}>
              {idCheck === 0 
                ? <span>멋진 아이디를 입력해주세요!</span>
                : idCheck === 1 ? 
                  <>
                    <MdCheck className={cx('UpTemplate-page1-idWrap-idCheck-success')}/>
                    <span>사용 가능한 아이디입니다!</span>
                  </>
                  : idCheck === 2 ? 
                    <>
                      <MdClose className={cx('UpTemplate-page1-idWrap-idCheck-error')}/>
                      <span>중복된 아이디입니다!</span>
                    </>
                    : 
                    <>
                      <MdClose className={cx('UpTemplate-page1-idWrap-idCheck-error')}/>
                      <span>올바르지 않은 형식입니다!</span>
                    </>
              }
            </div>
          </div>
          <div className={cx('UpTemplate-page1-pwWrap')}>
            <LightTooltip placement='top-start' title='비밀번호: 알파벳, 숫자, 특수문자, 7글자 ~ 20글자'>
              <div>
                <SignInput
                  inputType={'password'}
                  value={pw}
                  setValue={setPw}
                  placeholder={'비밀번호'}
                  handleFocusOut={handleCheckPw}
                  customStyle={{margin: '0 0 20px 0'}}
                />
              </div>
            </LightTooltip>
          </div>
          <div className={cx('UpTemplate-page1-checkPwWrap')}>
            <SignInput
              inputType={'password'}
              value={checkPw}
              setValue={setCheckPw}
              placeholder={'비밀번호 확인'}
              handleFocusOut={handleCheckPw}
              // customStyle={{margin: '20px 0 0 0'}}
            />
            <div className={cx('UpTemplate-page1-checkPwWrap-checkPw')}>
              {isRightPw === 0 
                ? <></>
                : isRightPw === 1 ? 
                  <>
                    <MdCheck className={cx('UpTemplate-page1-checkPwWrap-checkPw-success')}/>
                    <span>비밀번호가 일치합니다!</span>
                  </>
                  : isRightPw === 2 ? 
                    <>
                      <MdClose className={cx('UpTemplate-page1-checkPwWrap-checkPw-error')}/>
                      <span>비밀번호가 일치하지 않습니다!</span>
                    </>
                    : isRightPw === 3 ?
                      <>
                        <MdClose className={cx('UpTemplate-page1-checkPwWrap-checkPw-error')}/>
                        <span>비밀번호 형식이 틀립니다!</span>
                      </>
                      : <></>
              }
              {/* <button>아이디 체크</button> */}
            </div>
          </div>
          <div className={cx('UpTemplate-page1-btns')}>
            <Button
              customStyle={{width: '150px', height: '40px', fontSize: size.s2}}
              edgeType={'round'}
              appearance={'tertiary'}
              // isLoading={isLoading}
              handleFunction={changeSign}
            >
              로그인
            </Button>
            <Button
              customStyle={{width: '150px', height: '40px', fontSize: size.s2}}
              edgeType={'round'}
              appearance={'primary'}
              // isLoading={isLoading}
              handleFunction={() => handleNextPage(2)}
            >
              다음
            </Button>
          </div>
          {/* <button className={cx('UpTemplate-page1-nextBtn')} onClick={() => handleNextPage(2)}>다음</button> */}
        </div>
      );
    } else if (page === 2) {
      return (
        <div className={cx('UpTemplate-page2')}>
          <LightTooltip placement='top-start' title='이름: 한글, 영문, 2글자 ~ 12글자'>
            <div>
              <SignInput
                value={name}
                setValue={setName}
                customStyle={{margin: '0 0 20px 0'}}
                placeholder={'이름'}
              />
            </div>
          </LightTooltip>
          {/* <LightTooltip placement='top-start' title='닉네임: 한글, 영문, 숫자, 2글자 ~ 12글자'>
            <div>
              <SignInput
                value={nickName}
                setValue={setNickName}
                placeholder={'닉네임'}
              />
            </div>
          </LightTooltip> */}
          {/* <LightTooltip placement='top-start' title='전화번호: 숫자만 사용'>
            <div>
              <SignInput
                value={phone}
                setValue={setPhone}
                // customStyle={{margin: '20px 0'}}
                placeholder={'전화번호'}
              />
            </div>
          </LightTooltip> */}
          <div className={cx('UpTemplate-page2-emailWrap')}>
            <LightTooltip placement='top-start' title='이메일: 이메일 형식, 10글자 ~ 30글자'>
              <div>
                <SignInput
                  value={email}
                  setValue={setEmail}
                  customStyle={{margin: '0 0 20px 0'}}
                  placeholder={'이메일'}
                  isReadOnly={isCheckedEmail}
                />
              </div>
            </LightTooltip>
            {/* <div className={cx('UpTemplate-page2-emailWrap-emailCheck', {'UpTemplate-page2-emailWrap-emailChecked': isCheckedEmail})}>
              {
                isCheckedEmail ? 
                  <>
                    <MdCheck className={cx('UpTemplate-page2-emailWrap-emailCheck-success')}/>
                    <span>이메일이 인증되었습니다!</span>
                  </>
                  :
                  <>
                    <span>이메일을 검증해주세요!</span>
                    <button onClick={() => handleEmailModal()}>이메일 검증</button>
                  </>
              }
            </div> */}
          </div>
          <div className={cx('UpTemplate-page2-btns')}>
            <Button
              customStyle={{width: '150px', height: '40px', fontSize: size.s2}}
              edgeType={'round'}
              appearance={'tertiary'}
              handleFunction={() => setPage(1)}
            >
              이전
            </Button>
            <Button
              customStyle={{width: '150px', height: '40px', fontSize: size.s2}}
              edgeType={'round'}
              appearance={'primary'}
              handleFunction={() => handleNextPage(3)}
            >
              다음
            </Button>
            {/* <button className={cx('UpTemplate-page2-btn-prevBtn')} onClick={() => setPage(1)}>이전</button>
            <button className={cx('UpTemplate-page2-btn-nextBtn')} onClick={() => handleNextPage(3)}>다음</button> */}
          </div>
        </div>
      );
    } else if (page === 3) {
      return (
        <div className={cx('UpTemplate-page3')}>
          <span className={cx('UpTemplate-page3-title')}>
            이메일 인증코드 <span>발송 완료!</span>
          </span>
          <SignInput
            value={emailCode}
            setValue={setEmailCode}
            placeholder={'검증 코드'}
          />
          <div className={cx('UpTemplate-page3-btns')}>
            <Button
              customStyle={{width: '150px', height: '40px', fontSize: size.s2}}
              edgeType={'round'}
              appearance={'tertiary'}
              handleFunction={() => setPage(2)}
            >
              이전
            </Button>
            <Button
              customStyle={{width: '150px', height: '40px', fontSize: size.s2}}
              edgeType={'round'}
              appearance={'primary'}
              handleFunction={() => handleNextPage(4)}
            >
              다음
            </Button>
          </div>
        </div>
      );
    } else if (page === 4) {
      return (
        <div className={cx('UpTemplate-page4')}>
          <div className={cx('UpTemplate-page4-profileWrap')}>
            <div className={cx('UpTemplate-page4-profileWrap-header')}>
              <span className={cx('UpTemplate-page4-profileWrap-header-title')}>프로필 설정</span>
              <span className={cx('UpTemplate-page4-profileWrap-header-subTitle')}>미 선택시 기본 이미지로 설정됩니다.</span>
            </div>
            <LightTooltip placement='right-start' title='카메라 아이콘 또는 사진 클릭 시 사진 변경'>
              <label className={cx('UpTemplate-page4-profileWrap-imageWrap')} htmlFor="imgInput">
                <ImageIcon
                  src={imgBase64}
                  alt={'img'}
                  observer={imgBase64}
                />
                <label
                  className={cx('UpTemplate-page4-profileWrap-imageWrap-iconWrap')}
                  htmlFor="imgInput"
                >
                  <MdCameraAlt className="icon"/>
                </label>
                <input id="imgInput" type="file" onChange={e => handleChangeFile(e)} accept="image/*"/>
              </label>
            </LightTooltip>
            <button
              className={cx('UpTemplate-page4-profileWrap-default')}
              onClick={() => {setImgBase64(PROFILE_DEFAULT); setProfileImage(null);}}
            >
              기본 이미지
            </button>
          </div>
          <div className={cx('UpTemplate-page4-btns')}>
            <Button
              customStyle={{width: '150px', height: '40px', fontSize: size.s2}}
              edgeType={'round'}
              appearance={'tertiary'}
              handleFunction={() => setPage(3)}
            >
              이전
            </Button>
            <Button
              customStyle={{width: '150px', height: '40px', fontSize: size.s2}}
              edgeType={'round'}
              appearance={'primary'}
              handleFunction={() => requestSignUp()}
            >
              회원가입
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={cx('UpTemplate', {'UpTemplate-hidden': signType})}>
      {pageType()}
    </div>
  );
};

UpTemplate.propTypes = {
  signType: PropTypes.bool,
  changeSign: PropTypes.func,
  idObj: PropTypes.object,
  pwObj: PropTypes.object,
  checkPwObj: PropTypes.object,
  nameObj: PropTypes.object,
  emailObj: PropTypes.object,
  emailCodeObj: PropTypes.object,
  // phoneObj: PropTypes.object,
  // nickNameObj: PropTypes.object,
  profileImageObj: PropTypes.object,
  isCheckedEmailObj: PropTypes.object,
  pageObj: PropTypes.object,
  idCheck: PropTypes.number,
  isRightPw: PropTypes.number,
  handleNextPage: PropTypes.func,
  handleEmailModal: PropTypes.func,
  handleFocusOutId: PropTypes.func,
  handleCheckPw: PropTypes.func,
  handleCertification: PropTypes.func,
  requestSignUp: PropTypes.func
};

export default UpTemplate;