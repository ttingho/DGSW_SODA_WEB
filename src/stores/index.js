import testStore from './test';
import bambooStore from './bamboo';

const stores = {
  test: new testStore(),
  bamboo: new bambooStore()
};

export default stores;