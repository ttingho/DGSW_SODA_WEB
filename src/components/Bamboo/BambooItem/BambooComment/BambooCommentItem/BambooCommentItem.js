import React from 'react';
import classnames from 'classnames/bind';
import style from './BambooCommentItem.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

const cx = classnames.bind(style);

const BambooCommentItem = ({ item }) => {

  const { idx, memberId, contents, isUpdate, writeDate } = item;

  const writeDateFormat = moment(writeDate).format('MM-DD hh:mm');

  return (
    <div className={cx('BambooCommentItem')}>
      <div className={cx('BambooCommentItem-profileImageDiv')}>
        <div>
          {

          }
        </div>
      </div>
      <div className={cx('BambooCommentItem-contentsDiv')}>
        <div className={cx('BambooCommentItem-contentsDiv-memberId')}>
          <a>{memberId}</a>
        </div>
        <div className={cx('BambooCommentItem-contentsDiv-contents')}>
          {
            contents
          }
        </div>
      </div>
      <div className={cx('BambooCommentItem-subContentsDiv')}>
        {
          writeDateFormat
        }
        {
          isUpdate ? 
            '  (수정됨)'
            : <></>
        }
      </div>
    </div>
  );
};

BambooCommentItem.propTypes = {
  item: PropTypes.object,
};

export default BambooCommentItem;