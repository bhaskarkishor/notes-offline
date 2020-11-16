<template>
<div>
  <ClientOnly>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
    style="height:400px"
    placeholder="Write something …" 
    v-model="content" 
    :extensions="extensions"
    :toolbar-attributes="{ color: '#f2d38a' }"
    :card-props="{ flat: true, color: '#c4f2ee' }"
    />
    
  </ClientOnly>
  <v-btn class="my-2 mx-2 primaary" fab primary v-on:click="saveNote">
      <v-icon class="mdi mdi-check"></v-icon>
  </v-btn>
</div>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1]
          }
        }
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
    // starting editor's content
    content: null
  }),
  methods:{
      saveNote(){
        this.$store.commit('addNote',{'uid':this.getUID,'title':this.getHeadline,'content':this.content})
        alert('Note added')
        // console.log(this.$store.state.notes)
      }
  },
  computed:{
      getHeadline(){
          return this.content.slice(4,20)
      },
      getUID(){
          return this.$store.state.notes.length + 1
      }
  },
  created() {
    this.$nuxt.$on('noteSelectedFromList', (uid) => {
      // console.log('uid_index',uid)
      this.content = this.$store.getters.getNote(uid)
    })
}
}
</script>
