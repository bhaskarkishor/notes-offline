<template>
  <!-- <v-container>
    <div class="masonry">
        <div v-for="(note, key) in allNotes"
             :key="key"
             class="card"
        >
            <div class="card-content" v-html="note.content">
              
            </div>
        </div>
    </div>
  </v-container> -->
</template>

<script>
import editor from './../components/markdownEditor'
export default {
  components:{
    editor
  },
  data(){
    return {
      editor:false,
      allNotes: this.$store.state.notes
    }
  },
  computed: {
      activeFab () {
        if(this.editor){
          return { color: 'success', icon: 'mdi-share-variant' }
        }
        else{
          return { color: 'red', icon: 'mdi-pencil' }
        }
      },
    },
}
</script>

<style scoped>
.container{
  
  width:100%;
}
</style>