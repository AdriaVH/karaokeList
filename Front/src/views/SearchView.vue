vue <template>
  <div>

    <SearchBar></SearchBar>
    <List v-if="karaoke.searchTerm"></List>
    <!-- <AddToQue></AddToQue> -->


  </div>
</template>
<script>
import SearchBar from '../components/SearchBar.vue'
import List from '../components/List.vue'
import { useKaraokeStore } from '../stores/karaoke';
import AddToQue from '../components/AddToQue.vue';
export default {
  name:"AboutView",
  components:{SearchBar, List, AddToQue},
  data(){
    return{

    }
  },
  mounted() {
    this.changeListView()
  },
  methods: {
    changeListView() {
      this.karaoke.listView=true
    }
  },
computed:{
  searchTerm(){
    return this.karaoke.searchTerm
  },

  songsFiltered() {

      const searchTerms = this.karaoke.searchTerm.toLowerCase().split(/\s+/);

      this.karaoke.filteredSongs=this.karaoke.songs.filter(song =>
        Object.values(song).some(val =>
          searchTerms.some(term => String(val).toLowerCase().includes(term))
        )
      );
      return this.karaoke.filteredSongs
    }
},
created(){
  this.karaoke.$subscribe((mutation, state)=>{
    console.log('State changed:', state);

    this.songsFiltered
    this.listView
  })

},

  setup() {
    const karaoke = useKaraokeStore()
return {karaoke}


  },
  
  
}
</script>
<style>
.alphabetical-scroller ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem;
  margin-bottom: 1rem;
  list-style-type: none;
}

.alphabetical-scroller li {
  padding: 0.5rem;
  cursor: pointer;
}
</style>