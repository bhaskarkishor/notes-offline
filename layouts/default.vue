<template>
  <v-app>
    
  <v-row>
        <v-toolbar
          color="accent"
          
          :extension-height="slotExtensionHeight"
        >
          
          <v-toolbar-title class="primary--text">
            {{user}}'s Notes
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <template v-slot:extension >
            <Editor ref="editor" v-if="newNoteEntry"/>
            <v-fab-transition>
              <v-btn
                :key="activeFab.icon"
                fab
                :color="activeFab.color"
                bottom
                right
                absolute
                @click="activeFabClick"
              >
                <v-icon>{{activeFab.icon}}</v-icon>
              </v-btn>
            </v-fab-transition>
          </template>
          
        </v-toolbar>
  </v-row>


    <v-main v-show="!newNoteEntry">
      
        <nuxt />
      
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '../components/footer'
import Editor from '../components/markdownEditor'
export default {
  components:{
    Footer,Editor
  },
  data () {
    return {
      newNoteEntry:false,
      slotExtensionHeight:'20%',
      askUserNameDialog:false,
    }
  },
  methods:{
    activeFabClick(){
      if(this.newNoteEntry){
        this.saveNote()
      }
      else{
        this.createNote()
      }
    },
    createNote(){
      this.newNoteEntry = !this.newNoteEntry
      this.slotExtensionHeight = 500

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
      this.newNoteEntry = !this.newNoteEntry
      this.slotExtensionHeight = '50%'
    },
    setUserName(){
      this.$store.commit(setUsername,name)
    }
  },
  
  computed: {
      activeFab () {
        if(this.newNoteEntry){
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
  }
}
</script>
<style>
*{
  line-height: 0.9rem;
}
</style>