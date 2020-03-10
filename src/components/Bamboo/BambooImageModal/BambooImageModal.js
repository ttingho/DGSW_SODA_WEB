import React, { useState, useEffect } from 'react';
import './BambooImageModal.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

let counter = 0;

const BambooImageModal = ({ picture, onClose }) => {
  const [images, setImages] = useState([]);
  
  const subtractCounter = () => {
    counter--;

    if (counter < 0) {
      counter = picture.length - 1;
    }
    setImages(
      <img className="Content-ModalImage" src={picture[counter].url}/>
    )
  }

  const plusCounter = () => {
    counter++;

    if (counter >= picture.length) {
      counter = counter - counter;
    }

    setImages(
      <img className="Content-ModalImage" src={picture[counter].url}/>
    )
  }

  const setFirstImage = () => {
    setImages(
      <img className="Content-ModalImage" src={picture[0].url}/>
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
      </div>
      <div>
      </div>
    </div>
  )
}

export default BambooImageModal;