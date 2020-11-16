export const state = () => ({
    notes:[],
    userName:'Bhaskar',
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
    },
    setUserName(state,name){
      state.userName = name
    }
  }
export const actions = {
    //addNoteAction(context)
  }
export const getters = {
  getNote:(state)=>(uid)=>{
    // console.log('uid',uid)
    return state.notes.find(x => x.uid === uid).content
  },
  getUserName(state){
    return state.userName
  }
}