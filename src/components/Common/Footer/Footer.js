import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import style from './Footer.scss';
import { FaGithub } from 'react-icons/fa';

const cx = classNames.bind(style);

const Footer = ({ history }) => {
  return (
    <div className={cx('Footer')}>
      <div className={cx('Footer-wrap')}>
        <div className={cx('Footer-wrap-left')}>
          <span className={cx('Footer-wrap-left-version')}>version S.0415</span>
          <span className={cx('Footer-wrap-left-copyright')}>ⓒ TakeUp</span>
        </div>
        <div className={cx('Footer-wrap-right')}>
          <span className={cx('Footer-wrap-right-team')} onClick={() => history.push('/intro')}>팀 소개</span>
          <span className={cx('Footer-wrap-right-inquiry')} onClick={() => history.push('/inquiry')}>문의하기</span>
          <span className={cx('Footer-wrap-right-sign')} onClick={() => history.push('/sign')}>회원가입</span>
          <span className={cx('Footer-wrap-right-gitHub')} onClick={() => {}}>
            <FaGithub size={18} style={{marginRight: '4px'}}/>
            GitHub
          </span>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  history: PropTypes.object
};

export default withRouter(Footer);