import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './InTemplate.scss';
import SignInput from 'components/Common/SignInput';
import Button from 'components/Common/Button';
import { typography } from 'styles/typography/typography_scheme';
import { MdDone } from 'react-icons/md';

const { size } = typography;

const cx = classNames.bind(style);

const InTemplate = ({ signType, changeSign, idObj, pwObj, keepLoginObj, isLoading, requestSignIn }) => {
  const { id, setId } = idObj;
  const { pw, setPw } = pwObj;
  const { keepLogin, setKeepLogin } = keepLoginObj;

  return (
    <div className={cx('InTemplate', {'InTemplate-hidden': !signType})}>
      <SignInput
        value={id}
        setValue={setId}
        customClass={cx('InTemplate-idInput')}
        placeholder={'아이디'}
      />
      <SignInput
        value={pw}
        setValue={setPw}
        inputType={'password'}
        customClass={cx('InTemplate-pwInput')}
        placeholder={'비밀번호'}
        handleEnterFunc={requestSignIn}
      />
      <div className={cx('InTemplate-subFunc')}>
        <span className={cx('InTemplate-subFunc-toSignUp')} onClick={() => changeSign()}>회원가입 하기</span>
        <div className={cx('InTemplate-subFunc-loginKeep')}>
          <span onClick={() => setKeepLogin(!keepLogin)}>로그인 유지</span>
          <div className={cx('InTemplate-subFunc-loginKeep-box')} onClick={() => setKeepLogin(!keepLogin)}>
            <MdDone size={16} className={cx('InTemplate-subFunc-loginKeep-box-icon', {'InTemplate-subFunc-loginKeep-box-icon-hidden': !keepLogin})}/>
          </div>
        </div>
      </div>
      <Button
        customStyle={{width: '200px', height: '40px', fontSize: size.s2}}
        edgeType={'round'}
        appearance={'primary'}
        isLoading={isLoading}
        handleFunction={requestSignIn}
      >
        로그인  
      </Button>      
      {/* <div className={cx('InTemplate-find')}>
        <span className={cx('InTemplate-find-id')}>아이디 찾기</span>
        <span className={cx('InTemplate-find-pw')}>비밀번호 찾기</span>
      </div> */}
    </div>
  );
};

InTemplate.propTypes = {
  signType: PropTypes.bool,
  changeSign: PropTypes.func,
  idObj: PropTypes.object,
  pwObj: PropTypes.object,
  keepLoginObj: PropTypes.object,
  isLoading: PropTypes.bool,
  requestSignIn: PropTypes.func
};

export default InTemplate;