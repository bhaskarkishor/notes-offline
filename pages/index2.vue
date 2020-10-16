<template>
<div>
  <section>

    <Editor />
    <v-btn class="float-right my-2 mx-2" fab dark bottom right>
      <v-icon class="mdi mdi-content-save"></v-icon>
    </v-btn>
  </section>
  
</div>
</template>

<script>
import Editor from '../components/Editor'

export default {
  components: {
    Editor
  }
}
</script>

