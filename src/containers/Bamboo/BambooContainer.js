import React, {useState, useCallback, useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import BambooTemplate from 'components/Bamboo/BambooTemplate';
import BambooItem from 'components/Bamboo/BambooItem';
import './Load.scss';

import ProTypes from 'prop-types';

const page = 1;
let limit = 5;

const BambooContainer = ({ store }) => {
  const [feeds, setFeeds] = useState([]);
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isObserver, setIsObserver] = useState(true);

  // 초기 데이터 설정
  const handleBamboo =  useCallback(async () => {
    const { bamboo } = store;
    const data = await bamboo.getBambooFeed(page, limit);

    setFeeds(data.bamboo.map((feed) => <BambooItem key={feed.idx} item={feed}/>));
  }, []);

  // 2초 텀 두기
  const fetch = (delay) => new Promise(res => setTimeout(function(){ 

    limit += 5;
    res(setIsLoading(false));
  }, delay));

  // 서버로부터 추가 데이터 들고 오기
  const getMoreBambooFeeds = async () => {
    if (isObserver) {
      const { bamboo } = store;
      // delay
      await fetch(2000);
      const data = await bamboo.getBambooFeed(page, limit);
      
      // 마지막 게시물 조회가 끝났을경우
      if (limit > data.bamboo.length) {
        setIsObserver(false);
      }

      setFeeds(data.bamboo.map((feed) => <BambooItem key={feed.idx} item={feed}/>));
    }
  };

  // 스크롤 바닥 닿았을 경우 이벤트 처리
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && isObserver && !isLoading) {
      observer.unobserve(entry.target);
      setIsLoading(true);
      observer.observe(entry.target);
    }
  };


  useEffect(() => {
    handleBamboo();
  }, []);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  });

  useEffect(() => {
    getMoreBambooFeeds();
  }, [isLoading]);

  return (
    <>
      <BambooTemplate>
        {
          feeds
        }
        <div className={'Loading'} ref={setTarget}>
          {
            isLoading && isObserver && 'Loading...'
          }
        </div>
      </BambooTemplate>
    </>
  );
};

BambooContainer.propTypes = {
  store: ProTypes.object.isRequired,
};

export default inject('store')(observer(BambooContainer));