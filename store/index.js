export const state = () => ({
    notes:[]
  })
export const mutations = {
    addNote(state, note){
      state.notes.push(note);
    },
    deleteNote(state,uid){
      for(var i = 0; i < state.notes.length; i++) {
        if(state.notes[i].uid == uid) {
            state.notes.splice(i, 1);
            break;
        }
      }
      console.log('done deleted');
    }
  }
export const actions = {
    //addNoteAction(context)
  }