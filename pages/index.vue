<template>
  <div class="editor">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import Icon from './../components/icon'
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
  Underline
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    Icon,
  },
  watch: {
    composeDataMessageContent: function(content) {
//on a second thought i tried to watch to store change and update the editor content whenever the store value changes, but when i call "setContent" function it will trigger "onUpdate" function. so again the action dispatches.
        //this.editor.setContent(content)
    }
  },
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Underline(),
        new History()
      ],
      onUpdate: ({ getJSON, getHTML }) => {

        // this.$store.commit('update_note', {
        //   key: 'content',
        //   data: getJSON()
        // })
      },
      content: ' asdkkl'
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
} 
</script>