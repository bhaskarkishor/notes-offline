<template>
  <v-card class="card mx-3" outlined @click="selectNote(note.id)">
    <div class="card-content">
      <v-card-title style="padding:0">
      <v-spacer></v-spacer>
        <v-menu transition="slide-y-transition" right>
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
            <v-list-item v-for="(item, i) in cardMenuItems" :key="i" link>
              <v-list-item-title v-on:click="deleteNote(note.id)">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
        <v-textarea 
          class="custom"
          v-model="note.content"
          auto-grow 
          rows="1"
          hide-details
          dense
          readonly 
          color="accent"
          flat
          solo> 
        </v-textarea>
    </div>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      cardMenuItems:[
        {title:'Delete'}
      ]
    }
  },
  
  props:[
    'note'
  ],

  methods:{
    deleteNote(id){
      console.info('deleting note with id:',id);
      this.$store.dispatch('deleteNote',id);
    },

    selectNote(id){
      console.info('Note selected: ',id);
      this.$emit('getNote',id);
    },
  }
}
</script>

<style>
.v-text-field__slot textarea{
  line-height: 0.9;
  font-size: 0.8rem;
}
</style>