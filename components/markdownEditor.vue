<template>
    <div style="width:100%;height:100%">
    
        <!-- Use the component in the right place of the template -->
        <!-- <tiptap-vuetify
          style="height:700px;"
          height="300"
          placeholder="Write something …" 
          v-model="content" 
          :extensions="extensions"
          :toolbar-attributes="{ color: 'secondary' }"
          :card-props="{ flat: true, color: 'accent' }"
        /> -->
      <div class="editor">
        <editor-content class="editor__content" :editor="editor" />
      </div>  
    
    <!-- <v-btn class="my-2 mx-2 primaary" fab primary v-on:click="saveNote">
        <v-icon class="mdi mdi-check"></v-icon>
    </v-btn> -->
    </div>
</template>

<script>
// import the component and the necessary extensions
import Icon from './icon'
import { Editor, EditorContent } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  History,
} from 'tiptap-extensions'

export default {
  // specify TiptapVuetify component in "components"
  components: { EditorContent,
    Icon, },
  data: () => ({
    // declare extensions you want to use
    editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new History(),
        ],
        content: 'here we go  ',
      }),
  }),
  beforeDestroy() {
    this.editor.destroy()
  },
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
<style scoped>
.editor{
  background-color: white;
  height:90%;
}
.editor__content{
  background-color: aliceblue;
}
</style>