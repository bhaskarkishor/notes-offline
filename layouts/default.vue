<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      width="500"
    >
    <v-container style="width:500px;height:60px">
      <v-btn text fab class="float-right" v-on:click="drawer = !drawer">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn text fab class="float-right" v-on:click="sync">
        <v-icon>mdi-sync</v-icon>
      </v-btn>
    </v-container>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          exact
        >
          <v-list-item-action>
            <v-btn fab small red dark v-on:click="deleteNote(item.uid)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-btn text large v-on:click="selectNote(item.uid)">
              <v-list-item-title v-text="item.title" />
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
      <v-toolbar-title>Notes-Redefined</v-toolbar-title>
    
      <v-spacer />
      
      
      <v-btn class="mx-2" fab dark small color="primary">
        <v-icon dark>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
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
      drawer: true,
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