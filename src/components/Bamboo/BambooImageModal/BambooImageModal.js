import React from 'react';
import './BambooImageModal.scss';

const BambooImageModal = ({ picture }) => {
  console.log(picture);
  

  return (
<div className="BambooImageModal">
      <div className="content">
        <h3>이것은 모달</h3>
        <p>궁시렁 궁시렁 내용입니다.</p>
        <button>닫기</button>
      </div>
    </div>
  )
}

export default BambooImageModal;