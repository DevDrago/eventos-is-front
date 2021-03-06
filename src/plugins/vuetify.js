import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts = {
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#023abd',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    }
  },
  icons: {
    iconFont: 'md',
  }
};

export default new Vuetify(opts);

