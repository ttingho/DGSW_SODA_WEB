import React, { useEffect } from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import style from './PageTemplate.scss';
import NavBar from '../NavBar';
import { FaGithub } from 'react-icons/fa';

const cx = classNames.bind(style);

const PageTemplate = ({ pageType, url, children, history }) => {
  useEffect(() => {
    if (pageType === 'soda') {
      history.push('/bamboo');

      return;
    }
  }, []);

  return (
    <div className={cx('PageTemplate')}>
      <div className={cx('PageTemplate-header')}>
        <NavBar pageType={pageType} url={url} />
      </div>
      <div className={cx('PageTemplate-contents', {'PageTemplate-contents-inquiry': pageType === 'inquiry'})}>
        {children}
      </div>
      <div className={cx('PageTemplate-footer', {'PageTemplate-footer-hidden': pageType === 'bamboo'})}>
        <div className={cx('PageTemplate-footer-wrap')}>
          <div className={cx('PageTemplate-footer-wrap-left')}>
            <span className={cx('PageTemplate-footer-wrap-left-version')}>version S.0415</span>
            <span className={cx('PageTemplate-footer-wrap-left-copyright')}>ⓒ TakeUp</span>
          </div>
          <div className={cx('PageTemplate-footer-wrap-right')}>
            <span className={cx('PageTemplate-footer-wrap-right-team')} onClick={() => history.push('/intro')}>팀 소개</span>
            <span className={cx('PageTemplate-footer-wrap-right-inquiry')} onClick={() => history.push('/inquiry')}>문의하기</span>
            <span className={cx('PageTemplate-footer-wrap-right-sign')} onClick={() => history.push('/sign')}>회원가입</span>
            <span className={cx('PageTemplate-footer-wrap-right-gitHub')} onClick={() => {}}>
              <FaGithub size={18} style={{marginRight: '4px'}}/>
              GitHub
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

PageTemplate.propTypes = {
  pageType: PropTypes.oneOf([
    'bamboo',
    'inquiry'
  ]),
  url: PropTypes.string,
  children: PropTypes.node,
  history: PropTypes.object
};

export default withRouter(PageTemplate);
