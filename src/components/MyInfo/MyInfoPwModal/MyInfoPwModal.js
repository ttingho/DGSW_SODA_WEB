import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './MyInfoPwModal.scss';
import { MdClose } from 'react-icons/md';
import { withStyles } from '@material-ui/core/styles';
import { color } from 'styles/color/color_scheme';
import { AiOutlineCheck } from 'react-icons/ai';
import { typography } from 'styles/typography/typography_scheme';
import Tooltip from '@material-ui/core/Tooltip';
import Button from 'components/Common/Button';

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

const MyInfoPwModal = ({setIsPwModal, pwObj,checkPwAgainObj, handleModifyPw, checkPwObj, isObj, handleCheckUserPw, checkNewPwForm}) => {

  const {  isCheckPw, isPwValidateButton, isPwValidate } = isObj;

  const { pw, setPw } = pwObj;
  const { checkPw, setCheckPw } = checkPwObj;
  const { checkPwAgain, setCheckPwAgain } = checkPwAgainObj;

  return (
    <>
      <div className={cx('MyInfoPwModalTemplate-over')} onClick={() => setIsPwModal(false)}/>
      <div className={cx('MyInfoPwModalTemplate')}>
        <div className={cx('MyInfoPwModalTemplate-closeButtonDiv')}>
          <MdClose className={cx('MyInfoPwModalTemplate-closeButtonDiv-closeButton')} onClick={() => setIsPwModal(false)}/>
        </div>
        <div>
          <span className={cx('MyInfoPwModalTemplate-title')}>비밀번호 변경</span>
        </div>
        <div className={cx('MyInfoPwModalTemplate-contentsDiv')}>
          <div className={cx('MyInfoPwModalTemplate-contentsDiv-checkPwDiv')}>
            <input className={cx('MyInfoPwModalTemplate-contentsDiv-checkPwDiv-checkPw')} placeholder={'비밀번호'} type={'password'} value={pw} onChange={event => setPw(event.target.value)}/>
            {
              isPwValidate
                ? 
                <div className={cx('MyInfoPwModalTemplate-contentsDiv-checkPwDiv-objDiv')}> 
                  <AiOutlineCheck className={cx('MyInfoPwModalTemplate-contentsDiv-checkPwDiv-objDiv-icon')}/> <span className={cx('MyInfoPwModalTemplate-contentsDiv-checkPwDiv-objDiv-description')}>기존 비밀번호와 일치합니다.</span> 
                </div>
                : isPwValidateButton
                  ? <Button customStyle={{ width: '50px', height: '30px', margin: '7px 0px auto auto'}} handleFunction={handleCheckUserPw}>인증</Button>
                  : <></>
            }
          </div>
          <LightTooltip placement='top-start' title='비밀번호: 알파벳, 숫자, 특수문자, 7글자 ~ 20글자'>
            <div className={cx('MyInfoPwModalTemplate-contentsDiv-changePwDiv')}>
              <input className={cx('MyInfoPwModalTemplate-contentsDiv-changePwDiv-changePw')} placeholder={'새 비밀번호'} type={'password'} value={checkPw} onChange={(event) => setCheckPw(event.target.value)}/>
            </div>
          </LightTooltip>
          <LightTooltip placement='top-start' title='비밀번호: 알파벳, 숫자, 특수문자, 7글자 ~ 20글자'>
            <div className={cx('MyInfoPwModalTemplate-contentsDiv-changePwAgainDiv')}>
              <input className={cx('MyInfoPwModalTemplate-contentsDiv-changePwAgainDiv-changePwAgain')} placeholder={'새 비밀번호'} type={'password'} value={checkPwAgain} onChange={(event) => setCheckPwAgain(event.target.value)} onBlur={(e) => checkNewPwForm(e)} />
              {
                isCheckPw
                  ? 
                  <div className={cx('MyInfoPwModalTemplate-contentsDiv-checkPwDiv-objDiv')}> 
                    <AiOutlineCheck className={cx('MyInfoPwModalTemplate-contentsDiv-checkPwDiv-objDiv-icon')}/> <span className={cx('MyInfoPwModalTemplate-contentsDiv-checkPwDiv-objDiv-description')}>새 비밀번호가 일치합니다.</span> 
                  </div>
                  : <></>
              }
            </div>
          </LightTooltip>
        </div>
        <Button customStyle={{ width: '150px', height: '50px', margin: 'auto auto 20px auto'}} handleFunction={handleModifyPw}>변경 하기</Button>
      </div>
    </>
  );
};

MyInfoPwModal.propTypes = {

};

export default MyInfoPwModal;