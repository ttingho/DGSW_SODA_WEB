import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { TiMessages } from 'react-icons/ti';
import Button from 'components/Common/Button';
import { typography } from 'styles/typography/typography_scheme';
import style from './SignTemplate.scss';

const cx = classnames.bind(style);
const { size } = typography;

const SignTemplate = ({ children, signType, changeSign }) => {

  return (
    <div className={cx('SignTemplate')}>
      <div className="SignTemplate-left">
        <div className="SignTemplate-left-title">
          <span>SODA</span>{signType ? '를 시작해야 할 때!' : '를 시작하는 중!'}
        </div>
        <div className="SignTemplate-left-content">
          {children}
        </div>
        <div className={cx('SignTemplate-left-otherBtn')}>
          <span className={cx('SignTemplate-left-otherBtn-guest')}>게스트 로그인</span>
          {/* <button className={cx('SignTemplate-left-otherBtn-signUp')} onClick={() => changeSign()}>{signType ? '회원가입 하기' : '로그인 하기'}</button> */}
          <Button
            customStyle={{width: '210px', height: '55px', fontSize: size.s5}}
            edgeType={'round'}
            appearance={'secondary'}
            // handleFunction={changeSign}
          >
            {signType ? '회원가입 하기' : '로그인 하기'}
          </Button>
        </div>
      </div>
      <div className="SignTemplate-right">
        <div className="SignTemplate-right-top">
          <span className="SignTemplate-right-top-ment">
            대소고 소통의 다리
          </span>
          <div className="SignTemplate-right-top-title">
            <TiMessages className="SignTemplate-right-top-title-icon"/>
            <span className="SignTemplate-right-top-title-text">
              SODA
            </span>
          </div>
        </div>
        <div className="SignTemplate-right-bottom">
          <div className="SignTemplate-right-bottom-arrow1">
            <div>이 Youtube 영상을 공유해서</div>
            <div>다른 사람들에게도 알려주고 싶어.</div>
          </div>
          <div className="SignTemplate-right-bottom-arrow2">
            <div>내가 알고 있는 것을</div>
            <div>다른 사람들과 대화하고 싶은데</div>
            <div>어떻게 하면 쉽게 모두에게 전달될까?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignTemplate.propTypes = {
  children: PropTypes.any,
  signType: PropTypes.bool,
  changeSign: PropTypes.func,
};

export default SignTemplate;
