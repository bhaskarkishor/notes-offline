<template>
  <div>
    <!-- <h1 class="text-center">Notes</h1> -->
    
  </div>
</template>

<script>
import edit from '~/components/edit'
export default {
  middleware:'auth',
  components: {
    edit
  },
  data(){
    return {
      dialog: false,
      notes:[
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description"
        },
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description safgdf dfs f sf wf w g sgrdhd hgfj  dhs gh j dg jhg jdj d "
        },
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description kdsbfjksdhufsdfsd jsdfg dsufid gdfasuiyfvdidf dsfuyidsf df"
        },
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description"
        },
        {
          'title':'sample',
          'date':'12-09-2020',
          'content':"description"
        }
      ]
    }
  },
  methods:{
    edit:function(){
      this.dialog = true
    }
  }
}
</script>
