<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      width="500"
    >

    <v-container style="width:90%;height:60px">
      <v-img height="50" class="float-left" :src="$icon(64)"></v-img>
      <v-btn text fab class="float-right" v-on:click="drawer = !drawer">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn text fab class="float-right" v-on:click="sync">
        <v-icon>mdi-sync</v-icon>
      </v-btn>
      <v-btn text fab class="float-right" v-on:click="drawer = !drawer">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-container>


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
    </v-navigation-drawer> -->

    <v-app-bar
          color="light-blue"
          light
          extended
          
          hide-on-scroll
        >
          <v-toolbar-title class="white--text">
            Notes
          </v-toolbar-title>
          
          <template v-slot:extension v-if="newNoteEntry">
            <Editor/>
            <v-btn
              fab
              color="cyan accent-2"
              bottom
              right
              absolute
              @click="saveNote"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
           <template v-slot:extension v-else>
            <v-btn
              fab
              color="cyan accent-2"
              dark
              absolute
              right
              bottom   
              @click="openEditor"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-app-bar>

    
        <v-main>
        <nuxt />
        </v-main>
    
    
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
      newNoteEntry: false,
      items: this.$store.state.notes,
      extensionHeight:100
    }
  },
  methods:{
    openEditor(){
      this.newNoteEntry = !this.newNoteEntry
      this.extensionHeight = 100
    },
    saveNote(){
      this.newNoteEntry = !this.newNoteEntry
      this.extensionHeight = 50
    }
  }
}
</script>
<style scoped>

</style>