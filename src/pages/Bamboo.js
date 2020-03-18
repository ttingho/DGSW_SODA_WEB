import React from 'react';
import BambooContainer from 'containers/Bamboo';
import PageTemplate from 'components/Common/PageTemplate';

const Bamboo = () => {
  return (
    <>
      <PageTemplate pageType={'bamboo'}>
        <BambooContainer />
      </PageTemplate>
    </>
  );
};

export default Bamboo;