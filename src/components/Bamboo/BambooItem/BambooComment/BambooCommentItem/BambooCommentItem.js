import React , { useState, useEffect }from 'react';
import classnames from 'classnames/bind';
import style from './BambooCommentItem.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FiMoreHorizontal } from 'react-icons/fi';
import TokenVerification from 'lib/Token/TokenVerification';
import SecureLS from 'secure-ls';
import ImageIcon from 'components/Common/ImageIcon';
import ImageSrc from 'lib/Profile/ImageSrc';
import DEFAULT_PROFILE from 'assets/image/profile/profile.svg';

const cx = classnames.bind(style);

const BambooCommentItem = ({ item, deleteComment }) => {

  const { idx, bambooIdx, memberId, contents, isUpdate, writeDate, profileImage } = item;

  const [isMine, setIsMine] = useState(false);
  const [isDeleteButton, setIsDeleteButton] = useState(false);

  const setUpdateButton = async () => {
    const ls = new SecureLS({ encodingType: 'aes' });

    const userInfo = ls.get('user-info');
    
    if (userInfo.memberId === memberId) {
      setIsMine(true);
    }
  };

  const handleDeleteButton = async () => {
    if (isDeleteButton) {
      setIsDeleteButton(false);
    } else {
      setIsDeleteButton(true);
    }
  };

  useEffect(() => {
    setUpdateButton();
  }, []);

  const writeDateFormat = moment(writeDate).format('MM-DD hh:mm');

  return (
    <div className={cx('BambooCommentItem')}>
      <div className={cx('BambooCommentItem-profileImageDiv')}>
        <ImageIcon
          src={ImageSrc(profileImage, DEFAULT_PROFILE)}
          alt={'profileImage'}
          onErrorFunc={event => event.target.src = DEFAULT_PROFILE}
        />
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
        {
          isMine ?
            <div className={cx('BambooCommentItem-updateButtonDiv')}>
              <FiMoreHorizontal className={cx('BambooCommentItem-updateButtonDiv-icon')} onClick={() => handleDeleteButton()}/>
            </div>
            : <></>
        }
        {
          isDeleteButton ? 
            <div className={cx('BambooCommentItem-deleteButtonDiv')}>
              <button className={cx('BambooCommentItem-deleteButtonDiv-button')} onClick={() => deleteComment(idx, bambooIdx)}>삭제 하기</button>
            </div>
            : <></>
        }
      </div>
    </div>
  );
};

BambooCommentItem.propTypes = {
  item: PropTypes.object,
  deleteComment: PropTypes.func
};

export default BambooCommentItem;