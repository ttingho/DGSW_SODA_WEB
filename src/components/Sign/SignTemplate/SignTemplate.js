import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { TiMessages } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';
import TokenVerification from 'lib/Token/TokenVerification';
import Button from 'components/Common/Button';
import { typography } from 'styles/typography/typography_scheme';
import style from './SignTemplate.scss';

const cx = classnames.bind(style);
const { size } = typography;

const SignTemplate = ({ isModal, handleIsSignModal, children, page, signType, changeSign, history }) => {
  return (
    <>
      <div className={cx('SignTemplate-over', {'SignTemplate-hidden': !isModal})} onClick={() => handleIsSignModal(false)}/>
      <div className={cx('SignTemplate', {'SignTemplate-up': !signType}, {'SignTemplate-hidden': !isModal})}>
        <MdClose className="SignTemplate-close" onClick={() => handleIsSignModal(false)}/>
        <div className="SignTemplate-wrap">
          <div className={cx('SignTemplate-wrap-title', {'SignTemplate-wrap-title-up': !signType}, {'SignTemplate-wrap-title-page4': page === 4})}>
            <span>SODA</span>&nbsp;{signType ? ' 로그인 하기' : ' 회원가입 하기'}
          </div>
          <div className="SignTemplate-wrap-content">
            {children}
          </div>
          {/* <div className={cx('SignTemplate-left-otherBtn')}>
            <span className={cx('SignTemplate-left-otherBtn-guest')} onClick={() => history.push('/')}>게스트 로그인</span>
            <Button
              customStyle={{width: '200px', height: '40px', fontSize: size.s5}}
              edgeType={'round'}
              appearance={'secondary'}
              handleFunction={changeSign}
            >
              {signType ? '회원가입 하기' : '로그인 하기'}
            </Button>
          </div> */}
        </div>
        {/* <div className="SignTemplate-right">
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
        </div> */}
      </div>
    </>
  );
};

SignTemplate.propTypes = {
  isModal: PropTypes.bool,
  handleIsSignModal: PropTypes.func,
  children: PropTypes.any,
  page: PropTypes.number,
  signType: PropTypes.bool,
  changeSign: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(SignTemplate);
