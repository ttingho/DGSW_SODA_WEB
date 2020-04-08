import bambooStore from './bamboo';
import dialogStore from './dialog';
import uploadStore from './upload';
import signStore from './sign';
import adminStore from './admin';
import inquiryStore from './inquiry';

const stores = {
  bamboo: new bambooStore(),
  dialog: new dialogStore(),
  upload: new uploadStore(),
  sign: new signStore(),
  admin: new adminStore(),
  inquiry: new inquiryStore()
};

export default stores;
