<template>
  <v-container mt-5>
  <div class="masonry">
        <v-card v-for="(note, key) in notes"
             :key="key"
             class="card mx-3"
             outlined
             @click="openModel(note.uid)"
        >
          <div class="card-content">
            <v-card-text v-html="note.content">
            </v-card-text>
          </div>
        </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      notes:this.$store.state.notes,
    }
  },
  mounted(){
    this.resizeAllMasonryItems()
  },
  created () {
            let masonryEvents = ['load', 'resize'];
            let vm = this
            masonryEvents.forEach(function (event) {
                window.addEventListener(event, vm.resizeAllMasonryItems);
            });
        },
  methods:{
    openModel(uid){
      return
    },
    resizeMasonryItem (item) {
      /* Get the grid object, its row-gap, and the size of its implicit rows */
      let grid = document.getElementsByClassName('masonry')[0],
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

                /*
                 * Spanning for any brick = S
                 * Grid's row-gap = G
                 * Size of grid's implicitly create row-track = R
                 * Height of item content = H
                 * Net height of the item = H1 = H + G
                 * Net height of the implicit row-track = T = G + R
                 * S = H1 / T
                 */

      let rowSpan = Math.ceil((item.querySelector('.card-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

                /* Set the spanning as calculated above (S) */
      item.style.gridRowEnd = 'span ' + rowSpan;
    },
    resizeAllMasonryItems () {
                // Get all item class objects in one list
      let allItems = document.getElementsByClassName('card');

                /*
                 * Loop through the above list and execute the spanning function to
                 * each list-item (i.e. each masonry item)
                 */
      for (let i = 0; i < allItems.length; i++) {
        this.resizeMasonryItem(allItems[i]);
      }
    }
  }
}
</script>

<style lang="css" type="text/css">
    .masonry {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-auto-rows: 0;
    }
</style>