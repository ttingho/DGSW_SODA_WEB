import React, { Component, useState, useCallback, useEffect } from 'react';
import dateFormat from 'dateformat';
import 'containers/Bamboo/BambooContainer';
import './BambooItem.scss';
import PropTypes from 'prop-types';
import defaultProfileImage from '../../../assets/image/panda.jpg';
import facebookLogo from '../../../assets/image/994EAB4F5D2565432F.png';
import BambooImageModal from '../BambooImageModal';
import Pagination from 'components/Common/Pagination';

// eslint-disable-next-line react/prop-types
const BambooItem = ({ item }) => {
  const [profileImages, setProfileImages] = useState([]);
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [isModals, setIsModals] = useState(false);

  // eslint-disable-next-line react/prop-types
  const { contents, joinDate, allowDate, picture, name, profileImage } = item;

  const joinDateFormat = dateFormat(joinDate, 'yyyy-mm-dd h:MM:ss');
  const allowDateFormat = dateFormat(allowDate, 'yyyy-mm-dd h:MM:ss');

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
          작성날짜 :
          {
            joinDateFormat
          }
        </div>
        <div className="BambooCard-Top-AllowDateStyle">
          승인날짜 :
          {
            allowDateFormat
          }
        </div>
        <a className="BambooCard-Top-FacebookLink" href="https://www.facebook.com/dgswbambooforest/">
          <img className="BambooCard-Top-FacebookLinkImage" src={facebookLogo}/>
        </a>
        <div>
        </div>
      </div>
      <div className="BambooCard-Contents">
        <Pagination images={images} />
        <div className="BambooCard-FontStyle">
          {
            contents
          }
        </div>
      </div>
    </div>
  );
};

BambooItem.propTypes = {
  item: PropTypes.object
};

export default BambooItem;
