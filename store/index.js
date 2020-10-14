export const state = () => ({
    notes:[]
  })
export const mutations = {
    addNote(state, note){
      state.notes.push(note);
    },
    update_note(state,note){
      
    }
  }
export const actions = {
    //addNoteAction(context)
  }