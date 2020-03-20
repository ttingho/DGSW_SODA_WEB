import React, { useState, useEffect } from 'react';
import Template from 'components/BambooWrite/BambooWriteTemplate';
import GroupingState from 'lib/HookState/GroupingState';
import DEFAULT_PROFILE from 'assets/image/panda.jpg';

const BambooWrite = () => {
  const [contents, setContents] = useState('');
  const [name, setName] = useState('익명의 판다');
  const [profileSrc, setProfileSrc] = useState(DEFAULT_PROFILE);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isType, setIsType] = useState('empty');

  const [imageContents, setImageContents] = useState('');

  const handleIsType = type => {
    if (type === isType) return;
    setIsType(type);
  };

  const handleImageChange = event => {
    // event.preventDefault();

    // const reader = new FileReader();

    // const files = event.target.files;

    // reader.onloadend = () => {
    //   if (files.length === 1) {
    //     setImages(files[0]);
    //     setPreviewImages(reader.result);
    //   } else {
    //     setImages(files);
    //     setPreviewImages(reader.result);
    //   }
    // };

    // if (files.length === 1) {
    //   reader.readAsDataURL(files[0]);
    // } else {
    //   reader.readAsDataURL(files);
    // }
  };

  // useEffect(() => {
  //   console.log(images, previewImages);
  // }, [images, previewImages]);

  return (
    <Template
      profileSrc={profileSrc}
      name={name}
      contentsObj={GroupingState('contents', contents, setContents)}
      imagesObj={GroupingState('images', images, setImages)}
      handleIsType={handleIsType}
      handleImageChange={handleImageChange}
    />
  );
};

export default BambooWrite;
