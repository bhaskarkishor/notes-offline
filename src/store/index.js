import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes:[],
    new_notes_id_counter:0,
    user_name:'BNotes',
  },
  mutations: {
    
    setUserName(state,name){
      state.user_name = name
    }
  },
  actions: {
    async addNote(context, note_content){
      if(note_content.id) {
        context.state.notes.forEach(note => {
          if(note.id === note_content.id) {
            note.content = note_content.content;
          }
        });
      } else {
        note_content.id = context.state.new_notes_id_counter;
        context.state.new_notes_id_counter++;
        context.state.notes.push(note_content);
      }
      return note_content.id
    },
    
    deleteNote(context, id){
      console.log('store is being asked to delete '+id);
      context.state.notes = context.state.notes.filter(note => {
        return note.id != id;
      });
    },
  },
  getters:{
    getNote:(state) => (id) => {
      return state.notes.find(note => note.id===id ).content;
    }
  }
})
