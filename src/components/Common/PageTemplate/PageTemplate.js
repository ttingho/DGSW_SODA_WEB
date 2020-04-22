import React, { useEffect } from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import style from './PageTemplate.scss';
import NavBar from '../NavBar';
import Footer from '../Footer';

const cx = classNames.bind(style);

const PageTemplate = ({ pageType, url, children, history }) => {

  return (
    <div className={cx('PageTemplate')}>
      <div className={cx('PageTemplate-header')}>
        <NavBar pageType={pageType} url={url} />
      </div>
      <div className={cx('PageTemplate-contents', {'PageTemplate-contents-inquiry': pageType === 'inquiry'})}>
        {children}
      </div>
      <div className={cx('PageTemplate-footer')}>
        <Footer/>
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
