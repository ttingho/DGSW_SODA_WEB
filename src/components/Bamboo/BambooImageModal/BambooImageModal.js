import React, { useState, useEffect } from 'react';
import './BambooImageModal.scss';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';

let counter = 0;

const BambooImageModal = ({ picture, onClose, pictureIndex }) => {
  const [images, setImages] = useState([]);
  
  const subtractCounter = () => {
    counter--;

    if (counter === -1) {
      counter = picture.length - 1;
    }

    setImages(
      <img className="Content-ModalImage" src={picture[counter].url}/>
    )
  }

  const plusCounter = () => {
    counter++;

    if (counter >= picture.length) {
      counter = 0;
    }


    setImages(
      <img className="Content-ModalImage" src={picture[counter].url}/>
    )
  }

  const setFirstImage = () => {
    setImages(
      <img className="Content-ModalImage" src={picture[pictureIndex].url}/>
    )
  }

  useEffect(() => {
    setFirstImage();
  }, []);

  return (
    <div className="BambooImageModal">
      <div className="Content">
        <button className="Content-NextImageButton" onClick={() => subtractCounter()}>
          <IoIosArrowBack className="Content-NextImageButton-ButtonImageLeft"/>
        </button>
        {images}
        <button className="Content-NextImageButton" onClick={() => plusCounter()}>
          <IoIosArrowForward className="Content-NextImageButton-ButtonImageRight"/>
        </button>
        <div className="Content-CloseButtonDiv">
          <button className="Content-CloseButton" onClick={onClose}>
            <IoIosClose className="Content-CloseButton-CloseIcon"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BambooImageModal;