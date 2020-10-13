<template>
 
      <v-card>
        <v-card-title>
          <v-text-field></v-text-field>
        </v-card-title>
        <v-card-text>
         <v-textarea>
         </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
  export default {
    data: () => ({
      
    }),
  }
</script>