import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './BambooAdminTemplate.scss';
import PageLoading from 'components/Common/PageLoading';

const cx = classNames.bind(style);

const BambooAdminTemplate = ({ isPending, children }) => {
  return (
    <>
      {
        isPending ?
          <PageLoading /> :
          <div className={cx('BambooAdminTemplate', { 'BambooAdminTemplate-empty': children.length === 0 }, { 'BambooAdminTemplate-list': children.length !== 0 })}>
            {
              children.length === 0 ?
                '대기 중인 게시글이 없습니다.' :
                children
            }
          </div>
      }
    </>
  );
};

BambooAdminTemplate.propTypes = {
  isPending: PropTypes.bool,
  children: PropTypes.array
};

export default BambooAdminTemplate;
