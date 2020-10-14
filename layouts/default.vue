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
            <v-icon>{{ item.icon }}</v-icon>
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
      <v-toolbar-title>Notes</v-toolbar-title>
    
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
    
    <footer app>
    <div class="text-center">
      Made By Bhaskar Kishor | <span>&copy; {{ new Date().getFullYear() }}</span>
    </div>
    </footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'General',
          to: '/'
        },
        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      notes:[
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description"
        },
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description safgdf dfs f sf wf w g sgrdhd hgfj  dhs gh j dg jhg jdj d "
        },
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description kdsbfjksdhufsdfsd jsdfg dsufid gdfasuiyfvdidf dsfuyidsf df"
        },
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description"
        },
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description"
        }
      ]
    }
  }
}
</script>
<style scoped>
.account{
  overflow:hidden;
}
</style>