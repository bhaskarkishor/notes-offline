<template>
  <v-app dark>
    
  <v-row>
        <v-toolbar
          color="light-blue"
          light
          :extension-height="slotExtensionHeight"
        >
          
          <v-toolbar-title class="white--text">
            Notes
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


    <v-main>
      
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
      slotExtensionHeight:'50%',
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
      this.newNoteEntry = !this.newNoteEntry
      this.slotExtensionHeight = '50%'
      this.$refs.editor.saveNote()
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
    },

}
</script>
<style scoped>

</style>