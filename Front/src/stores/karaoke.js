
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
    songsOnCart:[],
    visible:true,
    tunnel:"",
    localhost:"https://plot-profits-partnership-reflects.trycloudflare.com"


  
  }),
  getters:{
    songBarVisible() {
      let result = false
      this.songs.map(song=> {song.Selected?result=true:""})
      console.log(result)
      return result
    },
    address(){
      let result=this.localhost
      if(this.tunnel){
result=this.tunnel
      }
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
