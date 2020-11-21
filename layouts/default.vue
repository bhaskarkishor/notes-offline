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
              <v-card-text v-html="note.content">
              </v-card-text>
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
      drawer: true,
      editorState:false,
      drawerWidth:'30%'
    }
  },
  mounted(){
    this.resizeAllMasonryItems()
    setTimeout(() => {  console.log("timeout");this.toggleDrawer(); }, 1000);
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
      this.toggleDrawer()
    },
    sync(){
      alert('Not available yet!')
    },
    activeFabClick(){
      if(this.editorState){
        // this.drawer=!this.drawer
        $nuxt.$emit('saveNote')
        this.editorState = ! this.editorState
        this.toggleDrawer()
      }
      else{
        this.editorState = !this.editorState
        this.toggleDrawer()
      }
    },
    resizeMasonryItem (item) {
      /* Get the grid object, its row-gap, and the size of its implicit rows */
      let grid = document.getElementsByClassName('masonry')[0],
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
                /*
                 * Spanning for any brick = S
                 * Grid's row-gap = G
                 * Size of grid's implicitly create row-track = R
                 * Height of item content = H
                 * Net height of the item = H1 = H + G
                 * Net height of the implicit row-track = T = G + R
                 * S = H1 / T
                 */
      let rowSpan = Math.ceil((item.querySelector('.card-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
                /* Set the spanning as calculated above (S) */
      item.style.gridRowEnd = 'span ' + rowSpan;
    },
    resizeAllMasonryItems () {
                // Get all item class objects in one list
      let allItems = document.getElementsByClassName('card');
                /*
                 * Loop through the above list and execute the spanning function to
                 * each list-item (i.e. each masonry item)
                 */
      for (let i = 0; i < allItems.length; i++) {
        this.resizeMasonryItem(allItems[i]);
      }
    },
    toggleDrawer(){
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