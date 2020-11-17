<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      :width="drawerWidth"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          exact
        >
          <v-card outlined class="my-1" v-on:click="selectNote(item.uid)" width="400" max-height="300">
             <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-actions  class="float-left">
                <v-btn fab small red dark  v-on:click="deleteNote(item.uid)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                </v-card-actions>
                <v-card-text v-html="item.content">
                </v-card-text>   
              </div>
             </div>         
          </v-card>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar 
    :clipped-left="clipped" 
    fixed 
    app
    extended
    extension-height="0"
    color="secondary">
      <template v-slot:extension>
        <v-fab-transition>
              <v-btn
                :key="activeFab.icon"
                fab
                color="primary"
                bottom
                left
                absolute
                @click="activeFabClick"
                class="v-btn--example"
              >
                <v-icon>{{activeFab.icon}}</v-icon>
              </v-btn>
        </v-fab-transition>
      </template>
      <v-spacer />
    </v-app-bar>

    <v-main>
      
        <nuxt />
      
    </v-main>
    
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '../components/footer'
export default {
  components:{
    Footer
  },
  data () {
    return {
      clipped: true,
      fixed: false,
      items:this.$store.state.notes,
      editorState:false
    }
  },
  methods:{
    deleteNote(uid){
      this.$store.commit('deleteNote',uid)
      alert('Note Deleted',uid)
    },
    selectNote(uid){
      $nuxt.$emit('noteSelectedFromList',uid)
      this.drawer = !this.drawer
    },
    sync(){
      alert('Not available yet!')
    },
    activeFabClick(){
      if(this.editorState){
        this.editorState = ! this.editorState
      }
      else{
        this.editorState = !this.editorState
      }
    }
  },
  computed: {
      activeFab () {
        if (this.editorState) {
          return {  icon: 'mdi-check' }
        }
        else{
          return {icon:'mdi-plus'}
        }
      },
    drawer(){
      return true
    },
    drawerWidth(){
      if(this.editorState){
        return '30%'
      }
      else{
        return '100%'
      }
    }
  }
}
</script>
<style scoped>
.account{
  overflow:hidden;
}
.v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
}
html { 
  overflow-y: auto 
}
</style>