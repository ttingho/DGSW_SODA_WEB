import React , { useState, useCallback, useEffect }from 'react';
import { inject,observer } from 'mobx-react';
import BambooItemComponent from 'components/Bamboo/BambooItem';
import PropTypes from 'prop-types';
import BambooCommentItem from 'components/Bamboo/BambooItem/BambooComment/BambooCommentItem';
import SecureLS from 'secure-ls';
import DEFAULT_PROFILE from 'assets/image/profile/profile.svg';
import ImageSrc from 'lib/Profile/ImageSrc';
import TokenVerification from 'lib/Token/TokenVerification';

const page = 1;
let limit = 0;

const BambooItem = ({ item, store }) => {
  const [comment, setComment] = useState('');
  const [isShowComment, setIsShowComment] = useState(false);
  const [commentData, setCommentData] = useState([]);

  const { postBambooComment, getBambooComment, deleteBambooComment } = store.bamboo;
  const { modal } = store.dialog;
  const { getMyInfo } = store.member;
  const { isModal } = store.sign; // 로그인 후 사용자 프로필을 가져오기 위함 (* sign의 isModal)

  const ls = new SecureLS({ encodingType: 'aes' });
  const userInfo = ls.get('user-info');
  const src = userInfo.profileImage;
  const token = TokenVerification();
  const [userProfile, setUserProfile] = useState(ImageSrc(src, DEFAULT_PROFILE));

  const handleImageError = useCallback(e => {
    setUserProfile(DEFAULT_PROFILE);
  }, []);

  async function fetchData() {
    await getMyInfo();
  }
  
  useEffect(() => {
    if (token === 'empty') {
      localStorage.removeItem('soda-token');
      localStorage.removeItem('soda-reToken');
      sessionStorage.removeItem('soda-token');
      sessionStorage.removeItem('soda-reToken');
      ls.removeAll();
      setUserProfile(DEFAULT_PROFILE);
    } else {
      fetchData();
      setUserProfile(ImageSrc(src, DEFAULT_PROFILE));
    }
  }, [isModal]);

  const getMoreComment = async (idx) => {
    setIsShowComment(true);
    limit += 5;
    
    const data = await getBambooComment(page, limit, idx);

    setCommentData(data.data.comments.map((feed) => <BambooCommentItem key={feed.idx} item={feed} deleteComment={deleteComment}/>));
  };

  const getComment = async (idx) => {
    limit += 1;
    const data = await getBambooComment(page, limit, idx);

    setCommentData(data.data.comments.map((feed) => <BambooCommentItem key={feed.idx} item={feed} deleteComment={deleteComment}/>));
  };

  const deleteComment = async (commentIdx, bambooIdx) => {
    await deleteBambooComment(commentIdx).
      then(response => {
        getComment(bambooIdx);
      })
      .catch(error => {
        const { status } = error.response;

        if (status === 500) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '서버 에러! 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  const commentSet = (event) => {
    if (event.target.value.length > 100) {
      modal({
        modalType: 'basic',
        title: 'Warning!',
        contents: '내용은 100자 이내로 작성해주세요.'
      });

      return;
    }

    setComment(event.target.value);
  };

  const writeBambooComment = async (idx) => {
    const token = TokenVerification();

    if (token === 'empty') {
      await modal({
        modalType: 'basic',
        title: 'Warning!',
        contents: '로그인 후 작성 가능합니다.'
      });

      return;
    }


    if (comment.length === 0) {
      await modal({
        modalType: 'basic',
        title: 'Warning!',
        contents: '내용을 작성해주세요.'
      });

      return;
    }

    const data = {
      bambooIdx: idx,
      contents: comment,
    };

    await postBambooComment(data).
      then(async(response) => {
        await getComment(idx);
        setComment('');
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 400) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '양식이 맞지 않아요!'
          });

          return;
        }

        if (status === 500) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '서버 에러! 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  return (
    <>
      <BambooItemComponent 
        token={token}
        item={item}
        comment={comment} 
        commentSet={commentSet} 
        writeBambooComment={writeBambooComment}
        isShowComment={isShowComment}
        getMoreComment={getMoreComment}
        commentData={commentData}
        deleteComment={deleteComment}
        userProfile={userProfile}
        handleImageError={handleImageError}
      />
    </>
  );
};

BambooItem.propTypes = {
  item: PropTypes.object,
  store: PropTypes.object,
};

export default inject('store')(observer(BambooItem));
