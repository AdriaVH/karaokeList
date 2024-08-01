<template>
  <div>

    <List></List>

  </div>
</template>
<script>
import AddToQue from '@/components/AddToQue.vue';
import List from '../components/List.vue'
import { useKaraokeStore } from '../stores/karaoke';
export default {
  name: "HomeView",
  components: { List, AddToQue },
  data() {
    return {

    }
  },

   setup() {
    const karaoke = useKaraokeStore()
    return { karaoke }
  },
  mounted() {
this.changeListView()
this.karaoke.$subscribe((mutation, state)=>{
    // console.log('State changed:', state);

    this.songsFiltered
    this.listView
  })
  },
  methods: {
    changeListView() {
      this.karaoke.listView=false
    }
  },
}
</script>
<style></style>