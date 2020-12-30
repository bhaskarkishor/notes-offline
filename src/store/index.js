import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key:'bnotes',
  storage: window.localStorage
})

export default new Vuex.Store({
  
  state: {
    notes:[],
    new_notes_id_counter:1,
    user_name:'BNotes',
  },
  mutations: {
    UPDATE_NOTE(state,payload){
      const note = state.notes.find(item => item.id === payload.id);
      note.content = payload.content;
    },
    ADD_NOTE(state,payload){
      state.notes.push(payload);
    },
    DELETE_NOTE(state,id){
      state.notes = state.notes.filter(note => {
        return note.id != id;
      });
    }
  },
  actions: {
    async addNote(context, note_content){
      if(note_content.id) {
        context.commit('UPDATE_NOTE',note_content);
      } else {
        note_content.id = context.state.new_notes_id_counter;
        context.state.new_notes_id_counter++;
        context.commit('ADD_NOTE',note_content);
      }
      return note_content.id
    },
    
    deleteNote(context, id){
      console.log('store is being asked to delete '+id);
      context.commit('DELETE_NOTE',id);
    },
  },
  getters:{
    getNote:(state) => (id) => {
      return state.notes.find(note => note.id===id ).content;
    }
  },
  plugins: [vuexLocal.plugin]
})
