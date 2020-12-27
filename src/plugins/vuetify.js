import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.purple,
            secondary: colors.yellow.darken3,
            accent: colors.yellow.lighten5,
            error: colors.red,
          },
        },
      },
});
