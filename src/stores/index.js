import bambooStore from './bamboo';
import dialogStore from './dialog';
import uploadStore from './upload';
import signStore from './sign';
import adminStore from './admin';
import questionStore from './question';

const stores = {
  bamboo: new bambooStore(),
  dialog: new dialogStore(),
  upload: new uploadStore(),
  sign: new signStore(),
  admin: new adminStore(),
  question: new questionStore()
};

export default stores;
