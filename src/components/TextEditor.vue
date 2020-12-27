<template>
  <v-container fluid>
      <v-textarea 
       placeholder="Enter text here"
       v-model="content"
       auto-grow 
       auto-focus 
       color="accent">
      
      </v-textarea>
      
  </v-container>
</template>

<script>
// import marked from 'marked';
// import _ from 'lodash';

export default {
  data(){
    return {
      content:'',
      note_id:null
    }
  },

  methods:{
    newNote(){
      console.log("event captured, newNote");
      this.content = null;
      this.note_id = null;
    },
    getNote(id){
      this.note_id = id;
      this.content = this.$store.getters.getNote(id);
    }
  },

  watch:{
    content(){
      console.info(this.note_id,'Changes detected');
      this.$store.dispatch('addNote',{
        id: this.note_id,
        content: this.content
      })
      .then(function(response){
        this.note_id = response;
      }.bind(this));
      console.info(this.note_id,'Changes saving');
    }
  }
}
</script>

<style>

</style>