<template>
<v-container mt-5>
  
   <tiptap-vuetify
      v-model="content"
      :extensions="extensions"
      placeholder="Add your thoughts"
      v-bind:style="width"
      class="mx-auto"
    />
</v-container>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'


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
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
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
      try{
        this.$store.commit('addNote',{'uid':this.getUID,'title':this.getHeadline,'content':this.content})
      }
      catch(err){
        if(err=="TypeError: Cannot read property 'slice' of null"){
          alert("Note is Empty")
        }
        else{
          alert(err)
        }
      }
     
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
      },
      width(){
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return {width:'400px'}
          case 'sm': return {width:'500px'}
          case 'md': return {width:'700px'}
          case 'lg': return {width:'700px'}
          case 'xl': return {width:'700px'}
        }
        return {
          width:'300px'
        }
      }
  },
  created() {
    this.$nuxt.$on('saveNote',()=>{
      this.saveNote()
    }),
    this.$nuxt.$on('noteSelectedFromList', (uid) => {
      console.log('uid_index',uid)
      this.content = this.$store.getters.getNote(uid)
      console.log('content update',this.content)
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style scoped>
.editor__content{
  height:500px;
  min-width:600px;
  max-width:700px;
}

</style>