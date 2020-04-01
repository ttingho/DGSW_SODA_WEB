import React, { useEffect } from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames/bind';
import style from './PageTemplate.scss';
import NavBar from '../NavBar';
import { withRouter } from 'react-router-dom';

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
      <div className={cx('PageTemplate-contents')}>
        {children}
      </div>
    </div>
  );
};

PageTemplate.propTypes = {
  pageType: PropTypes.oneOf([
    'bamboo',
    'soda'
  ]),
  url: PropTypes.string,
  children: PropTypes.node,
  history: PropTypes.object
};

export default withRouter(PageTemplate);
