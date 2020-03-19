import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import BambooAdminContainer from 'containers/BambooAdmin';

const BambooAdmin = () => {
  return (
    <PageTemplate pageType={'bamboo'}>
      <BambooAdminContainer />
    </PageTemplate>
  );
};

export default BambooAdmin;
