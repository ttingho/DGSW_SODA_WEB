import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './QuestionWriteTemplate.scss';
import Button from 'components/Common/Button';
import { MdInsertPhoto, MdClose } from 'react-icons/md';
import classNames from 'classnames';

const cx = classNames.bind(style);

const QuestionWriteTemplate = ({ 
  titleObj,
  contentsObj,
  categoryObj,
  handleQuestionWrite,
  imageContents,
  handleImageChange,
  images,
  handleImageCancel,
}) => {

  const { contents, setContents } = contentsObj;
  const { title, setTitle } = titleObj;
  const { category, setCategory } = categoryObj;

  const [isImage, setIsImage] = useState(false);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className={cx('QuestionWriteTemplate')}>
      <div className={cx('QuestionWriteTemplate-TitleDiv')}>
        <input className={cx('QuestionWriteTemplate-TitleDiv-Title')} type='text' placeholder={'제목!'}  value={title} onChange={event => setTitle(event.target.value)}/>
      </div>
      <div className={cx('QuestionWriteTemplate-ContentsDiv')}>
        <textarea className={cx('QuestionWriteTemplate-ContentsDiv-Contents')} placeholder={'궁금한 점 이나 버그신고는 여기에 작성해 주세요...'} value={contents} onChange={event => setContents(event.target.value)}/>
      </div>
      <div className={cx('QuestionWriteTemplate-buttons')}>
        <div className={cx('QuestionWriteTemplate-uploadButtonDiv')}>
          <label className={cx('QuestionWriteTemplate-uploadButtonDiv-Label')} htmlFor={'image_upload'}>사진 업로드</label>
          <input id={'image_upload'} className={'QuestionWriteTemplate-uploadButtonDiv-uploadButton'} type={'file'} accept={'image/gif, image/jpeg, image/jpg, image/png'} onChange={handleImageChange} multiple={'multiple'}></input>
        </div>
        <div className={cx('QuestionWriteTemplate-ImageHandleButtonDiv')}>
          <div className={cx('QuestionWriteTemplate-ImageCardDiv')}>
            {
              isImage && images.map((data, index) => {
                return <div key={index}>
                  <div className={cx('QuestionWriteTemplate-ImageCardDiv-ImageContentsCard')}>
                    <span className={cx('QuestionWriteTemplate-ImageCardDiv-ImageContentsCard-ImageContents')}>{data.name}</span>
                    <MdClose className={cx('QuestionWriteTemplate-ImageCardDiv-ImageContentsCard-ImageCancelButton')} onClick={() => handleImageCancel(data.idx)}/>
                  </div>
                </div>;
              })
            }
          </div>
          <button className={cx('QuestionWriteTemplate-ImageHandleButtonDiv-ImageHandleButton')} onClick={() => setIsImage(!isImage)}>
            <MdInsertPhoto className={cx('QuestionWriteTemplate-ImageHandleButtonDiv-ImageHandleButton-ButtonIcon')}/>
            <span className={cx('QuestionWriteTemplate-ImageHandleButtonDiv-ImageHandleButton-ImageContents')}>
              {
                imageContents
              }
            </span>
          </button>
        </div>
        <select className={cx('QuestionWriteTemplate-CategoryBox')} value={category} onChange={handleCategory}>
          <option value={'NotSelect'}>카테고리 유형을 선택해 주세요!</option>
          <option value={'대숲 버그 신고'}>대숲 서비스 관련 버그 신고</option>
          <option value={'소다 버그 신고'}>소다 서비스 관련 버그 신고</option>
          <option value={'관리자 문의'}>관리자한테 궁금 한거</option>
          <option value={'기타 문의'}>기타</option>
        </select>
      </div>
      <div className={cx('QuestionWriteTemplate-postButtonDiv')}>
        <span className={cx('QuestionWriteTemplate-postButtonDiv-UploadGuide')}>
          * 사진은 최대 5장 까지만 업로드 가능 합니다.
        </span>
        <Button customStyle={{ width: '150px', height: '100%', margin: 'auto 0 auto auto' }} handleFunction={handleQuestionWrite}>문의 하기</Button>
      </div>
    </div>
  );
};

QuestionWriteTemplate.propTypes = {
  titleObj: PropTypes.object,
  contentsObj: PropTypes.object,
  categoryObj: PropTypes.object,
  handleQuestionWrite: PropTypes.func,
  imageContents: PropTypes.string,
  handleImageChange: PropTypes.func,
  images: PropTypes.array,
  handleImageCancel: PropTypes.func,
  category: PropTypes.string,
  handleCategory: PropTypes.func
};

export default QuestionWriteTemplate;