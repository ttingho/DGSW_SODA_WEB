import React, { Component, useState } from 'react';
import propTypes from 'prop-types';
import 'containers/Bamboo/BambooContainer';
import './BambooItem.scss';

const BambooItem = ({ item }) => {
  console.log(item);
  
  const { contents, memberId,  category, joinDate, allowDate} = item;

  return (
    <div className="BambooCard">
      <div className="BambooContents">
        {contents}
      </div>
    </div>
  );
}

BambooItem.propTypes = {
  
}

export default BambooItem;