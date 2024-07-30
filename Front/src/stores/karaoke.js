
import { defineStore } from 'pinia'
import { watch } from 'vue';

export const useKaraokeStore = defineStore({
  id: 'karaoke',
  state: () => ({
    songs:[],
    searchTerm:"",
    filteredSongs:[],
    listView:"",
    onQue:[],
    coords:[],
    expanded:false,
    songsOnCart:[]


  
  }),
  getters:{
    songBarVisible() {
      let result = false
      this.karaoke.songs.map(song=> {song.Selected?result=true:result=false})
      console.log(result)
      return result
    }
  },
  
  actions:{
watchSongs(){
  let result=""
  watch(() => this.songs, (newValue, oldValue) => {
result=newValue
    // Perform actions based on the change
  }, { deep: true });

return result?true:false
}
  },



  
});
