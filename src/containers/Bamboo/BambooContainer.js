import React, {useState, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import ProTypes from 'prop-types';


const BambooContainer = ({ store }) => {
  const [feeds, setFeeds] = useState([]);

  const handleBamboo =  useCallback(async () => {
    const { bamboo } = store;
    const data = await bamboo.getBambooFeed();
    
    console.log(data);
    
  }, []);

  useEffect(() => {
    handleBamboo();
  }, []);

  return (
    <div>
       
    </div>
  );


};

BambooContainer.proTypes = {
  store: ProTypes.object.isRequired
};

export default inject('store')(observer(BambooContainer));