<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      right
      app
      absolute
      bottom
      stateless
      :width="drawerWidth"
      class="accent"
      
    >
      <v-container >
        <div class="masonry">
          <v-card v-for="(note, key) in notes"
              :key="key"
              class="card mx-3"
              outlined
              @click="selectNote(note.uid)"
          >
            <div class="card-content">
<!-- card menu -->
            <v-card-title style="padding:0">
            <v-spacer></v-spacer>
              <v-menu
                  transition="slide-y-transition"
                  right
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      right
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="(item, i) in cardMenuItems"
                      :key="i"
                      link
                    >
                      <v-list-item-title v-on:click="deleteNote(note.uid)">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
            </v-card-title>
              <v-card-text v-html="note.content"></v-card-text>
            </div>
          </v-card>
        </div>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar 
    :clipped-right="clipped" 
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
      <v-btn 
      text
      fab
      dark
      style="margin-right:-40px"
      @click="toggleDrawer">
      <v-icon large>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="accent">
      
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
      drawer: true,
      editorState:false,
      drawerWidth:'30%',
      cardMenuItems:[
        {title:'Delete'}
      ]
    }
  },
  mounted(){
    this.resizeAllMasonryItems()
    setTimeout(() => {  console.log("timeout");this.setDrawerWidth(); }, 1000);
    //
  },
  created () {
    let masonryEvents = ['load', 'resize'];
    let vm = this
    masonryEvents.forEach(function (event) {
      window.addEventListener(event, vm.resizeAllMasonryItems);
    });
    
  },
  methods:{
    deleteNote(uid){
      this.$store.commit('deleteNote',uid)
      alert('Note Deleted',uid)
    },
    selectNote(uid){
      console.log('emitted')
      $nuxt.$emit('noteSelectedFromList',uid)
      this.editorState = true
      this.setDrawerWidth()
    },
    sync(){
      alert('Not available yet!')
    },
    activeFabClick(){
      if(this.editorState){
        // this.drawer=!this.drawer
        $nuxt.$emit('saveNote')
        this.editorState = ! this.editorState
        this.setDrawerWidth()
      }
      else{
        this.editorState = !this.editorState
        this.setDrawerWidth()
      }
    },
    resizeMasonryItem (item) {
      /* Get the grid object, its row-gap, and the size of its implicit rows */
      let grid = document.getElementsByClassName('masonry')[0],
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      let rowSpan = Math.ceil((item.querySelector('.card-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
                /* Set the spanning as calculated above (S) */
      item.style.gridRowEnd = 'span ' + rowSpan;
    },
    resizeAllMasonryItems () {
                // Get all item class objects in one list
      let allItems = document.getElementsByClassName('card');
      for (let i = 0; i < allItems.length; i++) {
        this.resizeMasonryItem(allItems[i]);
      }
    },
    setDrawerWidth(){
      //this.editorState = ! this.editorState
      if(this.editorState){
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': this.drawerWidth= '0%';
          case 'sm': this.drawerWidth= '0%';
          case 'md': this.drawerWidth='0%';
          break;
          case 'lg': this.drawerWidth='30%'
          case 'xl': this.drawerWidth='30%'
        }
      }
      else{
        this.drawerWidth = '100%'
      }
    },
    toggleDrawer(){
      this.drawer = !this.drawer
    }
  },
  computed: {
    notes(){
      return this.$store.state.notes
    },
    activeFab () {
      if (this.editorState) {
        return {  icon: 'mdi-check' }
      }
      else{
        return {icon:'mdi-plus'}
      }
    },
  }
}
</script>
<style>
*{
  line-height: 0.1rem;
}
.account{
  overflow:hidden;
}
.v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
}
html { 
  overflow-y: hidden;
}
.masonry {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-auto-rows: 0;
}
</style>