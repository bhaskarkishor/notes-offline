<template>
  <div>
    
    <v-row>
      <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      width="50%"
      fixed
      right
      app
    >
      
    </v-navigation-drawer>
        <v-toolbar
          color="secondary"
          extended
          light
          :extension-height="slotExtensionHeight"
        >
          <v-spacer></v-spacer>
          <v-toolbar-title class="white--text text-h4">
            Notes
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <template v-slot:extension >
            <v-fab-transition>
              <v-btn
                :key="activeFab.icon"
                fab
                :color="activeFab.color"
                bottom
                left
                absolute
                @click="activeFabClick"
              >
                <v-icon>{{activeFab.icon}}</v-icon>
              </v-btn>
            </v-fab-transition>
          </template>
        </v-toolbar>
    </v-row>

    <v-main>
      <NotesView/>
    </v-main>
  </div>
</template>

<script>
import Editor from '../components/markdownEditor'
import NotesView from './../components/notesView'
export default {
  components:{
    Editor,
    NotesView
  },
  data () {
    return {
      miniVariant:false,
      clipped:true,
      drawer:true,
      noteEditorState:false,
      slotExtensionHeight:'20%',
      askUserNameDialog:false,
      widthNotesWindow:'80%'
    }
  },
  methods:{
    activeFabClick(){
      if(this.noteEditorState){
        this.saveNote()
      }
      else{
        this.createNote()
      }
    },
    createNote(){
      this.noteEditorState = !this.noteEditorState
      //this.$refs.
    },
    saveNote(){
      try{
        this.$refs.editor.saveNote()
      }
      catch(err){
        if(err=="TypeError: Cannot read property 'slice' of null"){
          alert("Note is Empty")
        }
        else{
          alert(err)
        }
      }
      this.noteEditorState = !this.noteEditorState
    },
    setUserName(){
      this.$store.commit(setUsername,name)
    }
  },
  
  computed: {
      activeFab () {
        if(this.noteEditorState){
          return { color: 'primary', icon: 'mdi-check', fun:'saveNote' }
        }
        else{
          return { color: 'primary', icon: 'mdi-plus', fun:'createNote' }
        }
      },
      user(){
        let user = this.$store.getters.getUserName
        if(user==''){
          this.askUserNameDialog = true
        }
        console.log(user,'user')
        return this.$store.getters.getUserName
      }
    },
  
  watch:{
    userName(){
      if(this.user==''){
        this.dialogUserName = true
        console.log('shit')
      }
    }
  },
  created () {
    let masonryEvents = ['load', 'resize'];
    let vm = this
    masonryEvents.forEach(function (event) {
      window.addEventListener(event, vm.resizeAllMasonryItems);
    });
  },
}
</script>
<style>
*{
  line-height: 0.1rem;
}
</style>