import React, { Component, useState, useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import 'containers/Bamboo/BambooContainer';
import './BambooItem.scss';
import BambooImageModal from '../BambooImageModal';

const BambooItem = ({ item }) => {
  const [profileImages, setProfileImages] = useState([]);
  const [images, setImages] = useState([]);
  let imageIndex = 0;
  let isModal;

  const { contents, joinDate, allowDate, picture } = item;
  // const profileImage = false;

  const handleBambooImage = useCallback(async () => {
    if (picture) {
      setProfileImages(<img className="BambooCard-Top-Profile-ProfileImage" src="http://54.180.86.178:9000/image/jpg/1583588473899.jpg"/>);  
    } else {
      setProfileImages(<img className="BambooCard-Top-Profile-ProfileImage" src="http://54.180.86.178:9000/image/jpeg/1583662825603.jpeg"/>);  
    }

    if (picture) {
      setImages(
        <div>
          <button className="BambooCard-Contents-ButtonStyle" onClick={() => viewNextImage()}>
            <img className="BambooCard-Contents-Image" src={picture[0].url}/>
          </button>
        </div>
      );
    }
  });

  const viewNextImage = () => {
    isModal = <BambooImageModal/>
  }

  useEffect(() => {
    handleBambooImage();
  }, [])
  
  return (
    <div className="BambooCard">
      <div className="BambooCard-Top">
        <div className="BambooCard-Profile">
          {profileImages}   
          <div className="BambooCard-Top-Profile-ProfileName">
              익명의 판다
          </div>
          <div className="BambooCard-Top-Profile-Subject">
              대나무 숲
          </div>
        </div>
        <div className="BambooCard-Top-FacebookLink">
          <img src=""/>
        </div>
        <div className="BambooCard-Top-JoinDateStyle">
          작성날짜 :
          {
            joinDate
          }
        </div>
        <div className="BambooCard-Top-AllowDateStyle">
          승인날짜 :
          {
            allowDate
          }
        </div>
      </div>
      <div className="BambooCard-Contents">
        {images}
        <div className="BambooCard-FontStyle">
          {
            contents
          }
        </div>
        <div>
          {
            isModal
          }
        </div>
      </div>
    </div>
  );
}

BambooItem.propTypes = {   
  
}

export default BambooItem;
