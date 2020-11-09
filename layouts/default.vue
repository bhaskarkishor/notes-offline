<template>
  <v-app dark>
    <v-navigation-drawer
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

    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img height="50" width="50" class="float-left" :src="$icon(512)"></v-img>
      <v-toolbar-title>Notes-Redefined</v-toolbar-title>
    
      <v-spacer />
      
      
      <v-btn class="mx-2" fab dark small color="primary">
        <v-icon dark>mdi-account</v-icon>
      </v-btn>

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
      clipped: false,
      drawer: false,
      fixed: false,
      items:this.$store.state.notes
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
    }
  }
}
</script>
<style scoped>
.account{
  overflow:hidden;
}
</style>