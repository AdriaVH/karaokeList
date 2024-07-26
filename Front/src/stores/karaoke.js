
import { defineStore } from 'pinia'

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
    visible:""


  
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

  },



  
});
