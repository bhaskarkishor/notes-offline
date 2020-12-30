<template>
  <v-app class="accent">
    <v-system-bar 
      color="primary" 
      dark
      height="15">
    </v-system-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :width="drawer_width"
      right
      app
      absolute
      hide-overlay
      class="accent"
      mobile-breakpoint="0"
    >
      <v-container fluid ml-0 pl-0>
      <v-btn 
        text
        fab
        small
        @click="toggleDrawer">
        <v-icon>{{toggleDrawerIcon.icon}}</v-icon>
      </v-btn>
      </v-container>
      <v-container>
        <div class="masonry">
          <NotePreview v-for="(note,key) in notes" :key="key" @getNote="selectNote" :note="note" />
        </div>
      </v-container>
    </v-navigation-drawer>

    <v-fab-transition>
      <v-btn
        fab
        color="primary"
        left
        absolute
        @click="newNote"
        class="new--btn"
      >
        <v-icon x-large>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-main class="accent">
      <TextEditor ref="textEditor" @contentChanged="resizeAllMasonryItems" />
    </v-main>

  </v-app>
</template>

<script>
//import Footer from './../components/footer'
import NotePreview from './../components/NotePreview';
import TextEditor from './../components/TextEditor';

export default {
  name:'index',
  components:{
    NotePreview,
    TextEditor
  },
  data () {
    return {
      clipped: true,
      fixed: false,
      drawer: true,
      editor_state:false,
      drawer_width:'0%',
    }
  },
  mounted(){
    this.resizeAllMasonryItems()
    setTimeout(() => {  console.info("Animation timeout");this.drawer_width='100%'; }, 500);
    //
  },

  created () {
    let masonryEvents = ['load', 'resize'];
    let vm = this
    masonryEvents.forEach(function (event) {
      window.addEventListener(event, vm.resizeAllMasonryItems);
    });
    //this.$on('getNote',this.selectNote);
  },

  methods:{
    sync(){
      alert('Not available yet!')
    },

    resizeMasonryItem (item) {
      /* Get the grid object, its row-gap, and the size of its implicit rows */
      let grid = document.getElementsByClassName('masonry')[0],
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      let rowSpan = Math.ceil((item.querySelector('.card-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = 'span ' + rowSpan;
    },
    resizeAllMasonryItems () {
      // Get all item class objects in one list
      let allItems = document.getElementsByClassName('card');
      for (let i = 0; i < allItems.length; i++) {
        this.resizeMasonryItem(allItems[i]);
      }
    },

    newNote(){
      console.info('Creating new note');
      if(!this.editor_state){
        this.editor_state = !this.editor_state;
        //this.changeDrawerWidth();
      }
      this.$refs.textEditor.newNote();
    },

    selectNote(id){
      console.log('note selected event');
      this.editor_state = true;
      this.$refs.textEditor.getNote(id)
    },
    toggleDrawer(){
      this.editor_state = ! this.editor_state
      //this.changeDrawerWidth()
    }
  },

  watch:{
    editor_state(){
      if(this.editor_state){
        // create animation using default behaviour
        this.drawer = !this.drawer
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': 
          case 'sm':
          case 'md': this.drawer_width=40;
          break;
          case 'lg': 
          case 'xl': this.drawer_width='30%'
        }
        setTimeout(() => {  this.drawer = !this.drawer }, 300);
      }
      else{
        this.drawer_width = '100%';
      }
    }
  },
  computed: {
    notes(){
      return this.$store.state.notes
    },
    toggleDrawerIcon(){
      if (!this.editor_state) {
        return {  icon: 'mdi-chevron-right' }
      }
      else{
        return {icon:'mdi-chevron-left'}
      }
    }
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
.new--btn {
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