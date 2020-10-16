// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'
 
export default ({ store }) => {
  new VuexPersistence({
    key:'vuex',
    storage:window.localStorage
    /* your options */
  }).plugin(store);
}