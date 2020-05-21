import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import style from './Footer.scss';
import { FaGithub } from 'react-icons/fa';

const cx = classNames.bind(style);

const Footer = ({ history }) => {
  const goSignUp = () => {
    localStorage.removeItem('soda-token');
    localStorage.removeItem('soda-reToken');
    sessionStorage.removeItem('soda-token');
    sessionStorage.removeItem('soda-reToken');
    
    const ls = new SecureLS({ encodingType: 'aes' });

    ls.removeAll();

    history.push('/sign');
  };

  return (
    <div className={cx('Footer')}>
      <div className={cx('Footer-wrap')}>
        <div className={cx('Footer-wrap-left')}>
          <span className={cx('Footer-wrap-left-version')}>version S.0415</span>
          <span className={cx('Footer-wrap-left-copyright')}>ⓒ takeUP</span>
        </div>
        <div className={cx('Footer-wrap-right')}>
          <span className={cx('Footer-wrap-right-team')} onClick={() => history.push('/intro')}>팀 소개</span>
          <span className={cx('Footer-wrap-right-inquiry')} onClick={() => history.push('/inquiry')}>문의하기</span>
          {/* <span className={cx('Footer-wrap-right-sign')} onClick={() => goSignUp()  }>회원가입</span> */}
          {/* <span className={cx('Footer-wrap-right-gitHub')} onClick={() => location.href='https://github.com/DGSW-takeUP'}>
            <FaGithub size={18} style={{marginRight: '4px'}}/>
            GitHub
          </span> */}
          <a className={cx('Footer-wrap-right-gitHub')}
            href='https://github.com/DGSW-takeUP'
            target='blank'
          >
            <FaGithub size={18} style={{marginRight: '4px'}}/>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  history: PropTypes.object
};

export default withRouter(Footer);