import React, {useState, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import BambooTemplate from 'components/Bamboo/BambooTemplate';
import BambooItem from 'components/Bamboo/BambooItem';
import ProTypes from 'prop-types';
import BambooImageModal from 'components/Bamboo/BambooImageModal';

const BambooContainer = ({ store }) => {
  const [feeds, setFeeds] = useState([]);

  const handleBamboo =  useCallback(async () => {
    const { bamboo } = store;
    const data = await bamboo.getBambooFeed();
    
    setFeeds(data.bamboo.map((feed) => <BambooItem key={feed.idx} item={feed}/>));
  }, []);

  useEffect(() => {
    handleBamboo();
  }, []);

  return (
    <>
      <BambooTemplate>
        {
          feeds
        }
      </BambooTemplate>
    </>
  );
};

BambooContainer.proTypes = {
  store: ProTypes.object.isRequired,
};

export default inject('store')(observer(BambooContainer));