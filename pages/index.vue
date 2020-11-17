<template>
<v-container>
  well
</v-container>
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
            levels: [1, 2, 3]
          }
        }
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
    // starting editor's content
    content: `Whats on Your Mind ...`
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
