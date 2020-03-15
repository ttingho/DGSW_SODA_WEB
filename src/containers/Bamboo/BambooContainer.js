import React, {useState, useCallback, useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import BambooTemplate from 'components/Bamboo/BambooTemplate';
import BambooItem from 'components/Bamboo/BambooItem';
import './Load.scss';
// import useIntersect from './useIntersect.js';

import ProTypes from 'prop-types';

const page = 1;
let limit = 5;

const BambooContainer = ({ store }) => {
  const [feeds, setFeeds] = useState([]);
  const [state, setState ] = useState({ limit: 0,  isLoading: false});

  const handleBamboo =  useCallback(async () => {
    const { bamboo } = store;
    const data = await bamboo.getBambooFeed(page, limit);

    setFeeds(data.bamboo.map((feed) => <BambooItem key={feed.idx} item={feed}/>));
  }, []);

  const fakeFetch = (delay = 1000) => new Promise(res => setTimeout(res, delay));

  // 서버로부터 추가 데이터 들고 오기
  const getMoreBambooFeeds = async () => {
    const { bamboo } = store;
    setIsLoading(true);
    await fakeFetch();
    limit += 5;
    const data = await bamboo.getBambooFeed(page, limit);
    setFeeds(data.bamboo.map((feed) => <BambooItem key={feed.idx} item={feed}/>));
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await getMoreBambooFeeds();
      observer.observe(entry.target);
    }
  };

  const [target, setTarget] = useState(null);

  const setObserver = () => {
    let observer;
	  if (target) {
		  observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(target);
	  }
    return () => observer && observer.disconnect();
  }


  useEffect(() => {
    handleBamboo();
    setObserver();
  });

  return (
    <>
      <BambooTemplate>
        {
          feeds
        }
        <div className={'Loading'} ref={setTarget}>
          {
            isLoading && 'Loading'
          }
        </div>
      </BambooTemplate>
    </>
  );
};

BambooContainer.proTypes = {
  store: ProTypes.object.isRequired,
};



export default inject('store')(observer(BambooContainer));