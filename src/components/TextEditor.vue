<template>
  <v-container fluid>
      <v-textarea 
      dense
       placeholder="Enter text here"
       v-model="content"
       auto-grow 
       auto-focus 
       background-color="accent"
       solo
       flat>
      </v-textarea>
      
  </v-container>
</template>

<script>
// import marked from 'marked';
// import _ from 'lodash';

export default {
  data(){
    return {
      content:null,
      note_id:null
    }
  },

  methods:{
    newNote(){
      console.log("event captured, newNote");
      this.content = null;
      if(this.note_id!=0){
        this.note_id = null;
      }
      
    },
    getNote(id){
      this.note_id = id;
      this.content = this.$store.getters.getNote(id);
    }
  },

  watch:{
    content(){
      console.info(this.note_id,'Changes detected');
      this.$emit('contentChanged');
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