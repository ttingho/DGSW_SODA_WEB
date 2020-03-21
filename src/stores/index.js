import bambooStore from './bamboo';
import dialogStore from './dialog';
import uploadStore from './upload';

const stores = {
  bamboo: new bambooStore(),
  dialog: new dialogStore(),
  upload: new uploadStore()
};

export default stores;
