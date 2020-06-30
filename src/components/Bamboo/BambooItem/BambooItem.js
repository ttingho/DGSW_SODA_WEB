import React, { Component, useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import 'containers/Bamboo/BambooContainer';
import './BambooItem.scss';
import PropTypes from 'prop-types';
import defaultProfileImage from '../../../assets/image/panda.jpg';
import Pagination from 'components/Common/Pagination';
import BammbooCommentTemplate from 'components/Bamboo/BambooItem/BambooComment/BambooCommentTemplate';
import { FaFacebookF } from 'react-icons/fa'; 
import ImageIcon from 'components/Common/ImageIcon';

// eslint-disable-next-line react/prop-types
const BambooItem = ({ item, comment, writeBambooComment, commentSet, isShowComment, getMoreComment, commentData, userProfile, handleImageError }) => {
  const [profileImages, setProfileImages] = useState([]);
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  
  // eslint-disable-next-line react/prop-types
  const { idx, contents, count, joinDate, allowDate, picture, name, profileImage } = item;

  const joinDateFormat = moment(joinDate).format('YYYY-MM-DD HH:mm');
  const allowDateFormat =  moment(allowDate).format('YYYY-MM-DD HH:mm');

  const handleBambooImage = useCallback(async () => {
    // 프로필 이미지 설정
    if (profileImage) {
      setProfileImages(<img className="BambooCard-Top-Profile-ProfileImage" src={profileImage}/>);
    } else {
      setProfileImages(<img className="BambooCard-Top-Profile-ProfileImage" src={defaultProfileImage}/>);  
    }

    if (picture && picture.length !== 0) {
      const list  = [];

      for (let i = 0; i < picture.length; i++) {
        list.push(picture[i].url);
      }

      setImages(list);
    }

    if (name) {
      setNames(
        <div className="BambooCard-Top-Profile-ProfileName">
          {name}
        </div>
      );
    } else {
      setNames(
        <div className="BambooCard-Top-Profile-ProfileName">
          익명의 판다
        </div>
      );
    }
  });

  useEffect(() => {
    handleBambooImage();
  }, []);
  
  return (
    <div className="BambooCard">
      <div className="BambooCard-Top">
        <div className="BambooCard-Profile">
          {profileImages}
          {
            names
          }
          <div className="BambooCard-Top-Profile-Subject">
              대나무 숲
          </div>
        </div>
        <div className="BambooCard-Top-JoinDateStyle">
          제보 :
          {
            joinDateFormat
          }
        </div>
        <div className="BambooCard-Top-AllowDateStyle">
          승인 :
          {
            allowDateFormat
          }
        </div>
        <div  className="BambooCard-Top-FacebookLink">
          <a href="https://www.facebook.com/dgswbambooforest/" target="blank">
            <FaFacebookF className="BambooCard-Top-FacebookLinkImage"/>
          </a>
        </div>
      </div>
      <div className="BambooCard-Contents">
        <Pagination images={images} />
        <div className="BambooCard-FontStyle">
          <pre className="BambooCard-FontStyle">
            {
              contents
            }
          </pre>
        </div>
        <div className="BambooCard-countFont">
          #대소고_대숲_{count + 1}번째 이야기
        </div>
      </div>
      <div className="BambooCard-commentDiv">
        <div className="BambooCard-commentDiv-contentsBox">
          <div className="BambooCard-commentDiv-contentsBox-profileImageDiv">
            <ImageIcon
              src={userProfile}
              onErrorFunc={handleImageError}
              observer={userProfile}
            />
          </div>
          <div className="BambooCard-commentDiv-contentsBox-inputDiv">
            <input className="BambooCard-commentDiv-contentsBox-inputDiv-input" type={'text'} value={comment} onChange={commentSet}/>
          </div>
          <div className="BambooCard-commentDiv-contentsBox-writeButtonDiv">
            <button className="BambooCard-commentDiv-contentsBox-writeButtonDiv-button"  onClick={() => writeBambooComment(idx)}>작성</button>
          </div>
        </div>
      </div>
      {
        isShowComment ?  
          <BammbooCommentTemplate>
            {
              commentData
            }
          </BammbooCommentTemplate>
          : <></>
      }
      <div className="BambooCard-commentDiv-commentShowButtonDiv">
        <p className="BambooCard-commentDiv-commentShowButtonDiv-fontStyle" onClick={() => getMoreComment(idx)}>
          댓글 보기
        </p>
      </div>
    </div>
  );
};

BambooItem.propTypes = {
  item: PropTypes.object,
  commentObj: PropTypes.object,
  writeBambooComment: PropTypes.func,
  userProfile: PropTypes.string,
  handleImageError: PropTypes.func
};

export default BambooItem;
