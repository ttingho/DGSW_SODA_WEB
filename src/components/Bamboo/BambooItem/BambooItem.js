import React, { Component, useState, useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import 'containers/Bamboo/BambooContainer';
import './BambooItem.scss';
import BambooImageModal from '../BambooImageModal';

const BambooItem = ({ item }) => {
  const [profileImages, setProfileImages] = useState([]);
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  const [isNames, setIsNames] = useState([]);
  const [isModals, setIsModals] = useState([]);
  const [isImage, setIsImage] = useState([]);

  const { contents, joinDate, allowDate, picture, name, profileImage } = item;

  const handleBambooImage = useCallback(async () => {
    if (profileImage) {
      setProfileImages(<img className="BambooCard-Top-Profile-ProfileImage" src={profileImage}/>);  
    } else {
      setProfileImages(<img className="BambooCard-Top-Profile-ProfileImage" src="http://54.180.86.178:9000/image/jpeg/1583662825603.jpeg"/>);  
    }

    if (picture) {
      setImages(
        <div>
          <button className="BambooCard-Contents-ButtonStyle" onClick={() => openModal()}>
            <img className="BambooCard-Contents-Image" src={picture[0].url}/>
          </button>
        </div>
      );

      setIsImage(true);
    }
    if (name) {
      setNames(
        <div className="BambooCard-Top-Profile-ProfileName">
          {name}
        </div>
      )
    } else {
      setNames(
        <div className="BambooCard-Top-Profile-ProfileName">
          익명의 판다
        </div>
      )
    }

    if (name) {
      setIsNames(
        <div className="BambooCard-Contents-Bottom-CheckName">
          실명 게시물
        </div>
      )} else {
      setIsNames(<div className="BambooCard-Contents-Bottom-CheckName">
          익명 게시물
      </div>)
    }
  });

  const openModal = () => {
    setIsModals(<BambooImageModal picture={picture}/>);
  }

  const closeModal = () => {
    setIsModals(false);
  }

  const handleBambooIsImage = () => {
    
    setIsImage(false);

    console.log({isImage});
  }

  useEffect(() => {
    handleBambooImage();
    handleBambooIsImage();
  }, [])
  
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
        <div className="BambooCard-Top-FacebookLink">
          <a href=""><img src=""/></a>
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
        {
         isModals
        }
      </div>
      <div className="BambooCard-Contents-Bottom">
        <a href="https://www.facebook.com/dgswbambooforest/">
          <button className="BambooCard-Contents-Bottom-FacebookLink">
            <img className="BambooCard-Contents-Bottom-FacebookLinkImage" src="http://54.180.86.178:9000/image/webp/1583672362749.webp"/>
          </button>
        </a>
        <div>
          {
            isNames
          }
        </div>
      </div>
    </div>
  );
}

BambooItem.propTypes = {   
  
}

export default BambooItem;
