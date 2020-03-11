import React, { Component, useState, useCallback, useEffect } from 'react';
import 'containers/Bamboo/BambooContainer';
import './BambooItem.scss';
import BambooImageModal from '../BambooImageModal';

const BambooItem = ({ item }) => {
  const [profileImages, setProfileImages] = useState([]);
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [isModals, setIsModals] = useState(false);

  const { contents, joinDate, allowDate, picture, name, profileImage } = item;

  const handleBambooImage = useCallback(async () => {
    // 프로필 이미지 설정
    if (profileImage) {
      setProfileImages(<img className="BambooCard-Top-Profile-ProfileImage" src={profileImage}/>);  
    } else {
      setProfileImages(<img className="BambooCard-Top-Profile-ProfileImage" src="http://54.180.86.178:9000/image/jpeg/1583662825603.jpeg"/>);  
    }
    // 게시물 이미지가 하나 일 경우
    if (picture && picture.length === 1) {
      setImages(
        <div>
          <button className="BambooCard-Contents-ImageButton" onClick={() => openModal(0)}>
            <img className="BambooCard-Contents-Image" src={picture[0].url}/>
          </button>
        </div>
      );
    // 게시물 이미지가 여러개 일 경우  
    } else if (picture && picture.length >= 1) {
      setImages(
        <div className="BambooCard-Contents-ImageBackground">
          <button className="BambooCard-Contents-FirstImageButton" onClick={() => openModal(0)}>
            <img className="BambooCard-Contents-FirstImages" src={picture[0].url}/>
          </button>
          <button className="BambooCard-Contents-SecondImageButton" onClick={() => openModal(1)}>
            <img className="BambooCard-Contents-SecondImages" src={picture[1].url}></img>
          </button>
          <button className="BambooCard-Contents-PlusButton" onClick={() => openModal(0)}>
            <p className="BambooCard-Contents-PlusImage">+{picture.length - 1}</p>
          </button>
        </div>
      )
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
  });

  const openModal = (imageIndex) => {
    setIsModals(true);
    setPictureIndex(imageIndex);
  }

  const closeModal = () => {
    setIsModals(false);
  }

  useEffect(() => {
    handleBambooImage();
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
        <a className="BambooCard-Top-FacebookLink" href="https://www.facebook.com/dgswbambooforest/">
          <img className="BambooCard-Top-FacebookLinkImage" src="http://54.180.86.178:9000/image/webp/1583672362749.webp"/>
        </a>
        <div>
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
          isModals && (
            <BambooImageModal picture={picture} onClose={() => closeModal()} pictureIndex={pictureIndex}/>
          )
        }
      </div>
    </div>
  );
}

export default BambooItem;
