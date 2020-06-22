import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from './BambooCommentTemplate.scss';

const cx = classnames.bind(style);

const BambooCommentTemplate = ({ children }) => {

  return (
    <div className={cx('BambooCommentTemplate')}>
      {
        children.length === 0 ?
          <div className={cx('BambooCommentTemplate-notFoundComment')}>
            댓글이 없습니다.
          </div>
          :<>{children}</>
      }
    </div>
  );
};

BambooCommentTemplate.propTypes = {
  children: PropTypes.any,
};

export default BambooCommentTemplate;
