import bambooStore from './bamboo';
import dialogStore from './dialog';
import uploadStore from './upload';
import signStore from './sign';

const stores = {
  bamboo: new bambooStore(),
  dialog: new dialogStore(),
  upload: new uploadStore(),
  sign: new signStore(),
};

export default stores;
