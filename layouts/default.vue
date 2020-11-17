<template>
  <v-app >
    <v-main class="accent">
      <nuxt />
      
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '../components/footer'
export default {
  components:{
    Footer
  },
  data () {
    return {
      
    }
  }  
}
</script>
<style>
*{
  line-height: 0.1rem;
}
</style>