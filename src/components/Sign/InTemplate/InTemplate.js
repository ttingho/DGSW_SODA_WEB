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

const InTemplate = ({ signType, idObj, pwObj, keepLoginObj, isLoading, requestSignIn }) => {
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
      <div className={cx('InTemplate-loginKeep')}>
        <span onClick={() => setKeepLogin(!keepLogin)}>로그인 유지</span>
        <div className={cx('InTemplate-loginKeep-box')} onClick={() => setKeepLogin(!keepLogin)}>
          <MdDone size={18} className={cx('InTemplate-loginKeep-box-icon', {'InTemplate-loginKeep-box-icon-hidden': !keepLogin})}/>
        </div>
      </div>    
      <Button
        customStyle={{width: '500px', height: '65px', fontSize: size.s6}}
        edgeType={'round'}
        appearance={'primary'}
        isLoading={isLoading}
        handleFunction={requestSignIn}
      >
        로그인  
      </Button>      
      <div className={cx('InTemplate-find')}>
        <span className={cx('InTemplate-find-id')}>아이디 찾기</span>
        <span className={cx('InTemplate-find-pw')}>비밀번호 찾기</span>
      </div>
    </div>
  );
};

InTemplate.propTypes = {
  signType: PropTypes.bool,
  idObj: PropTypes.object,
  pwObj: PropTypes.object,
  keepLoginObj: PropTypes.object,
  isLoading: PropTypes.bool,
  requestSignIn: PropTypes.func
};

export default InTemplate;