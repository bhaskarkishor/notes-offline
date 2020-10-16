<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-btn fab small red dark v-on:click="deleteNote(item.uid)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant" >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
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
      items:this.$store.state.notes,
      miniVariant: false,
      right: true,
    }
  },
  methods:{
    deleteNote(uid){
      this.$store.commit('deleteNote',uid)
      alert('Note Deleted',uid)
    }
  }
}
</script>
<style scoped>
.account{
  overflow:hidden;
}
</style>